"use client";

import { erc20Abi, Hex, parseUnits, formatUnits } from "viem";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { wagmiConfig } from "../provider";
import { sepolia } from "viem/chains";
import {
  maxDepositAtom,
  minDepositAtom,
  tokenDecimals,
  vaultAtom,
} from "@/utils/atom";
import { useAtom } from "jotai";
import TokenAddress, { vault } from "@/app/token-vault/[tokenAddress]/page";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { abiVault } from "@/utils/abiVault";

export function CardDeposit() {
  const [vaultData] = useAtom<vault | null>(vaultAtom);
  const [balance, setBalance] = useState<string>("0");
  const [decimals, setDecimals] = useAtom(tokenDecimals);
  const [depositAmount, setDepositAmount] = useState("");
  const [minDeposit, setMinDeposit] = useAtom(minDepositAtom);
  const [maxDeposit, setMaxDeposit] = useAtom(maxDepositAtom);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");

  if (!vaultData) {
    return "Loading vault data";
  }

  async function fetchDecimals() {
    if (!vaultData) {
      return "Loading vault data";
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
    if (!vaultData) {
      return 0n;
    }

    const balance = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: vaultData?.assetTokenAddress, //token erc-20
      functionName: "balanceOf",
      chainId: sepolia.id,
      args: ["0xD2dD0C955b5a0eDEAA05084778bF4f7a03D2AaDA"], //Address of the wallet
    });

    return balance;
  }

  async function fetchDepositDetails() {
    if (!vaultData) {
      return { minDeposit: 0n, maxDeposit: 0n };
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
        address: vaultData.address,
        functionName: "deposit",
        chainId: sepolia.id,
        args: [parsedDepositAmount],
      });

      console.log("Simulation Successfull:", simulateDeposit);

      const depositTx = await writeContract(wagmiConfig, {
        abi: abiVault,
        address: vaultData.address, //Address of contract
        functionName: "deposit",
        chainId: sepolia.id,
        args: [parsedDepositAmount], //Amount to be deposited
      });

      setMessage("Waiting for transaction");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: depositTx,
      });

      const response = await fetch("/api/createSwap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedDepositAmount,
          type: simulateDeposit.request.functionName,
          txHash: depositTx,
          sender: simulateDeposit.request.account?.address,
          vaultId: vaultData.id,
        }),
      });
      const data = await response.json();

      if (data.success) {
        console.log("Transaction created in the database");
        return;
      }

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
              intent={"primary"}
              size={"large"}
              placeholder="0"
              onChange={(event) => setDepositAmount(event.target.value)}
            ></Input>
            <div className="text-xs mt-0.5 right-10 absolute text-white">
              {vaultData.assetTokenName}
            </div>
            <img
              className="size-5 ml-0.5 absolute right-4"
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
