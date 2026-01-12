"use client";

import { abiVault } from "@/utils/abiVault";
import {
  maxDepositAtom,
  minDepositAtom,
  tokenDecimals,
  vaultAtom,
} from "@/utils/atom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { erc20Abi, formatUnits, Hex, isAddress, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { Button } from "../interface/button";
import { Card } from "../interface/Card";
import { Input } from "../interface/input";
import { wagmiConfig } from "../Providers";

export function CardDeposit() {
  const [vaultData] = useAtom(vaultAtom);
  const [balance, setBalance] = useState<string>("0");
  const [decimals, setDecimals] = useAtom(tokenDecimals);
  const [depositAmount, setDepositAmount] = useState("");
  const [minDeposit, setMinDeposit] = useAtom(minDepositAtom);
  const [maxDeposit, setMaxDeposit] = useAtom(maxDepositAtom);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");

  const { address } = useAccount();

  const currentDate = new Date();
  const endDate = vaultData.endsAt;
  const startDate = vaultData.startsAt;

  async function fetchDecimals() {
    if (!isAddress(vaultData.assetTokenAddress)) {
      throw new Error("Unexpected error, assetTokenAddress is invalid");
    }

    const tokenDecimals = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: vaultData.assetTokenAddress,
      functionName: "decimals",
      chainId: sepolia.id,
      args: [],
    });

    setDecimals(tokenDecimals);
  }

  async function fetchBalance() {
    if (!isAddress(vaultData.assetTokenAddress)) {
      throw new Error("Unexpected error, assetToken is invalid");
    }

    const balance = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: vaultData.assetTokenAddress, //token erc-20
      functionName: "balanceOf",
      chainId: sepolia.id,
      args: [address!], //Address of the wallet
    });

    return balance;
  }

  async function fetchDepositDetails() {
    if (!isAddress(vaultData.address)) {
      throw new Error("Unexpected error, address is invalid");
    }

    const minDeposit = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vaultData.address,
      functionName: "minDeposit",
      chainId: sepolia.id,
      args: [],
    });

    const maxDeposit = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vaultData.address,
      functionName: "maxDepositPerWallet",
      chainId: sepolia.id,
      args: [],
    });

    return { minDeposit, maxDeposit };
  }

  useEffect(() => {
    const loadBalance = async () => {
      await fetchDecimals();
      const fetchedBalance = await fetchBalance();
      const formattedBalance = formatUnits(fetchedBalance, decimals);

      setBalance(formattedBalance);

      const { minDeposit, maxDeposit } = await fetchDepositDetails();
      setMinDeposit(minDeposit);
      setMaxDeposit(maxDeposit);
    };
    loadBalance();
  }, [decimals]);

  if (!isAddress(vaultData.address)) {
    throw new Error("Unexpected error, address is  invalid");
  }
  if (!isAddress(vaultData.assetTokenAddress)) {
    throw new Error("Unexpected error, assetTokenAddress is invalid");
  }

  const tokenAddress = vaultData.assetTokenAddress;
  const spenderAddress = vaultData.address;

  async function approveToken(amount: bigint) {
    const tx = await writeContract(wagmiConfig, {
      abi: erc20Abi,
      address: tokenAddress, //Token tUSDT
      functionName: "approve",
      chainId: sepolia.id,
      args: [spenderAddress, amount],
    });
    return tx;
  }

  const { isConnected } = useAccount();

  useEffect(() => {
    const validateButtonState = async () => {
      const parsedDepositAmount = parseUnits(depositAmount, decimals);
      const currentBalance = await fetchBalance();

      if (parsedDepositAmount === 0n) {
        setMessage("Please enter a value");
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount > currentBalance) {
        setMessage("Insufficient balance"); //Balance for deposit
        setIsButtonDisabled(true);
        return;
      }

      const { minDeposit, maxDeposit } = await fetchDepositDetails();

      if (parsedDepositAmount < minDeposit) {
        setMessage("The minimum deposit has not been reached"); //Minimum deposit per wallet
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount > maxDeposit) {
        setMessage("the maximum deposit has been exceeded"); //Maximum deposit per wallet
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount + currentBalance > maxDeposit) {
        setMessage("The maximum deposit has been exceeded"); //Balance +input > Maxium deposit per wallet
        setIsButtonDisabled(true);
        return;
      }

      setIsButtonDisabled(false);
      setMessage("");
    };

    validateButtonState();
  }, [depositAmount, decimals]);

  async function onSubmit() {
    try {
      if (!isConnected) {
        setMessage("Please connect your wallet"); //Wallet connected
        return;
      }
      setMessage("");

      if (currentDate > endDate) {
        setMessage("Sorry, this vault was finished");
        setIsButtonDisabled(true);
        return;
      }

      if (currentDate < startDate) {
        setMessage("Sorry, this vault hasn't been started yet");
        setIsButtonDisabled(true);
        return;
      }

      const parsedDepositAmount = parseUnits(depositAmount, decimals);

      const approveTxHash = await approveToken(parsedDepositAmount);

      setMessage("Waiting for approval receipt");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: approveTxHash,
      });

      if (!vaultData) {
        return "Loading vault data";
      }

      const simulateDeposit = await simulateContract(wagmiConfig, {
        abi: abiVault,
        address: vaultData.address as Hex,
        functionName: "deposit",
        chainId: sepolia.id,
        args: [parsedDepositAmount],
      });

      console.log("Simulation Successfull:", simulateDeposit);

      const depositTx = await writeContract(wagmiConfig, {
        abi: abiVault,
        address: vaultData.address as Hex, //Address of contract
        functionName: "deposit",
        chainId: sepolia.id,
        args: [parsedDepositAmount], //Amount to be deposited
      });

      setMessage("Waiting for transaction");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: depositTx,
      });

      const amountString = parsedDepositAmount.toString();

      const response = await fetch("/api/createSwap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountString, //Don't use bigint in the JSON.stringify
          type: simulateDeposit.request.functionName,
          txHash: depositTx,
          sender: simulateDeposit.request.account?.address,
          vaultId: vaultData.id,
        }),
      });
      const data = await response.json();

      console.log("Deposit transaction sent:", data);
      setMessage("Deposit successfull");
    } catch (error) {
      console.error("Error in transaction", error);
    }
  }

  if (!vaultData) {
    return <p className="text-red-500">Loading vault data ...</p>;
  }

  return (
    <div>
      <h1 className="ml-4 mb-2.5 text-white text-xl">
        Deposit {vaultData.assetTokenName}
      </h1>
      <h2 className="text-xs ml-4 mb-2.5">
        Deposit yours tokens into a {vaultData.name} for safety!
      </h2>
      <div className="flex justify-center">
        <Card intent={"tertiary"} size={"mediumSmall"}>
          <div className="flex justify-between">
            <h1 className="text-sm ml-2 pb-1 mt-1">Vault token</h1>
            <h2 className="text-xs mr-2 mt-2">Balance: {balance}</h2>
          </div>
          <div className="flex">
            <Input
              className="text-xs text-text-foreground hover:bg-transparent border-transparent"
              type="number"
              intent={"primary"}
              size={"large"}
              placeholder="0"
              onChange={(event) => setDepositAmount(event.target.value)}
            ></Input>
            <div className="text-xs mt-0.5 right-10 absolute text-white">
              {vaultData.assetTokenName}
            </div>
            <img
              className="size-5 ml-0.5 absolute right-4 rounded-full"
              src={vaultData.logo}
            />
          </div>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button
          className={`mt-2.5 w-[270px] ${
            isButtonDisabled
              ? "bg-gray-500 shadow-gray-400"
              : "bg-accent hover:bg-purple-600 shadow-shadow"
          }`}
          intent={"secondary"}
          size={"mediumLarge"}
          onClick={onSubmit}
          disabled={isButtonDisabled}
        >
          {message || `Deposit ${vaultData.assetTokenName}`}
        </Button>
      </div>
    </div>
  );
}
