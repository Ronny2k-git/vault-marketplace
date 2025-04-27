"use client";

import { amountTotalDeposited, tokenDecimals, vaultAtom } from "@/utils/atom";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import { useAtom } from "jotai";
import { wagmiConfig } from "../Providers";
import { abiVault } from "@/utils/abiVault";
import { sepolia } from "viem/chains";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { erc20Abi, formatUnits, isAddress, parseUnits } from "viem";

export function CardRemove() {
  const [vaultData] = useAtom(vaultAtom);
  const [totalDeposited, setTotalDeposited] = useAtom(amountTotalDeposited);
  const [decimals] = useAtom(tokenDecimals);
  const [removeAmount, setRemoveAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { address } = useAccount();

  const currentDate = new Date();
  const endDate = vaultData.endsAt;
  const startDate = vaultData.startsAt;

  async function totalAmountDeposited() {
    if (!isAddress(vaultData.address)) {
      throw new Error("Unexpected error, address is invalid");
    }

    const amountDeposited = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vaultData.address,
      functionName: "deposited",
      chainId: sepolia.id,
      args: [address!],
    });
    const depositedValue = BigInt(amountDeposited);

    setTotalDeposited(depositedValue);
    return depositedValue;
  }

  async function approveToken(amount: bigint) {
    if (!isAddress(vaultData.address)) {
      throw new Error("Unexpected error, address is invalid");
    }

    if (!isAddress(vaultData.assetTokenAddress)) {
      throw new Error("Unexpected error, assetToken is invalid");
    }
    const spenderAddress = vaultData.address;

    const tx = await writeContract(wagmiConfig, {
      abi: erc20Abi,
      address: vaultData.assetTokenAddress,
      functionName: "approve",
      chainId: sepolia.id,
      args: [spenderAddress, amount],
    });
    return tx;
  }

  useEffect(() => {
    totalAmountDeposited();

    const validateButton = async () => {
      const parsedDepositAmount = parseUnits(removeAmount, decimals);
      const amountDeposited = await totalAmountDeposited();

      if (parsedDepositAmount === 0n) {
        setMessage("Please enter a value");
        setIsButtonDisabled(true);
        return;
      }

      if (amountDeposited === 0n) {
        setMessage("No amount deposited");
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount > amountDeposited) {
        setMessage("Insufficient balance");
        setIsButtonDisabled(true);
        return;
      }
      setIsButtonDisabled(false);
      setMessage("");
    };
    validateButton();
  }, [removeAmount, decimals]);

  const { isConnected } = useAccount();

  async function onSubmit() {
    try {
      if (!vaultData) {
        return;
      }

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

      const parsedDepositAmount = parseUnits(removeAmount, decimals);

      const approveTxHash = await approveToken(parsedDepositAmount);

      setMessage("Waiting for transaction");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: approveTxHash,
      });

      if (!isAddress(vaultData.address)) {
        throw new Error("Unexpected error, assetToken is invalid");
      }

      const simulateTx = await simulateContract(wagmiConfig, {
        abi: abiVault,
        address: vaultData.address, //Address of contract
        functionName: "withdraw",
        chainId: sepolia.id,
        args: [parsedDepositAmount],
      });

      console.log("Result of simulation:", simulateTx);

      const removeTx = await writeContract(wagmiConfig, {
        abi: abiVault,
        address: vaultData.address, //Address of contract
        functionName: "withdraw",
        chainId: sepolia.id,
        args: [parsedDepositAmount],
      });

      setMessage("Waiting for transaction");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: removeTx,
      });

      const response = await fetch("/api/createSwap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedDepositAmount.toString(), //Don't use bigint in the JSON.stringify
          type: simulateTx.request.functionName,
          txHash: removeTx,
          sender: simulateTx.request.account?.address,
          vaultId: vaultData.id,
        }),
      });

      const data = await response.json();

      console.log("Remove transaction sent:", data);
      setMessage("Transaction successfull");
    } catch (error) {
      console.error("Error in transaction:", error);
    }
  }

  return (
    <div>
      <h1 className="ml-4 mb-2.5 text-white text-xl">
        Withdraw {vaultData.assetTokenName}
      </h1>
      <h2 className="text-xs ml-4 mb-2.5">
        Deposit yours tokens into a {vaultData.name} for safety!
      </h2>
      <div className="flex justify-center">
        <Card intent={"tertiary"} size={"mediumSmall"}>
          <div className="flex justify-between">
            <h1 className="text-sm ml-2 pb-1 mt-1">Vault token</h1>
            <h2 className="text-xs mr-2 mt-2">
              Deposited:
              {formatUnits(totalDeposited, decimals) || "Loading ..."}
            </h2>
          </div>
          <div className="flex">
            <Input
              className="text-xs text-text-foreground hover:bg-transparent border-transparent"
              intent={"primary"}
              type="number"
              size={"large"}
              placeholder="0"
              onChange={(event) => setRemoveAmount(event.target.value)}
            ></Input>
            <div className="text-xs mt-0.5 right-10 absolute text-white">
              {vaultData.assetTokenName}
            </div>
            <img
              className="size-5 absolute ml-0.5 right-4 rounded-full"
              src={vaultData.logo}
            />
          </div>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button
          className={`mt-2.5 w-[270px] ${
            isButtonDisabled
              ? "bg-gray-500 shadow-gray-300"
              : "bg-accent hover:bg-purple-600 shadow-shadow"
          }`}
          intent={"secondary"}
          size={"mediumLarge"}
          onClick={onSubmit}
          disabled={isButtonDisabled}
        >
          {message || `Withdraw ${vaultData.assetTokenName}`}
        </Button>
      </div>
    </div>
  );
}
