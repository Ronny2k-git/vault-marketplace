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

export function VaultCardDeposit() {
  const [vaultData] = useAtom(vaultAtom);
  const [balance, setBalance] = useState<string>("0");
  const [decimals, setDecimals] = useAtom(tokenDecimals);
  const [depositAmount, setDepositAmount] = useState("");
  const [, setMinDeposit] = useAtom(minDepositAtom);
  const [, setMaxDeposit] = useAtom(maxDepositAtom);
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
        setMessage("Please connect your wallet");
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
    <div className="flex flex-col p-2 gap-4">
      <div className="flex flex-col gap-2">
        <h1 className=" text-white text-xl">
          Deposit {vaultData.assetTokenName}
        </h1>
        <h2 className="text-sm text-gray-300">
          Deposit yours tokens into a {vaultData.name} for safety!
        </h2>
      </div>

      <div className="flex justify-center">
        <Card className="py-4 px-2" intent={"tertiary"} size={"mediumSmall"}>
          <div className="flex justify-between items-center">
            <h1 className="text-base text-gray-300">Vault token</h1>
            <h2 className="text-sm text-gray-300">
              Balance: {Number(balance || 0).toFixed(0)}
            </h2>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Input
              className="text-lg text-white hover:bg-transparent border-transparent"
              type="number"
              intent={"primary"}
              size={"large"}
              placeholder="0"
              onChange={(event) => setDepositAmount(event.target.value)}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-nowrap text-white">
                {vaultData.assetTokenName}
              </span>

              <img
                alt="vault-logo"
                className="size-6 rounded-full"
                src={vaultData.logo}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Action */}
      <Button
        className={`w-full ${
          isButtonDisabled
            ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed shadow-gray-400"
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
  );
}
