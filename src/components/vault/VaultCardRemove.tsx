"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import {
  useGetTokenBalance,
  useGetTokenDecimals,
  useGetVaultBalance,
} from "@/global/hooks";
import { abiVault } from "@/utils/abiVault";
import { useEffect, useState } from "react";
import { Address, erc20Abi, formatUnits, isAddress, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { Button } from "../interface/button";
import { Card } from "../interface/Card";
import { Input } from "../interface/input";
import { wagmiConfig } from "../Providers";

export function VaultCardRemove({ vault }: { vault: VaultFromDb }) {
  const [removeAmount, setRemoveAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  //Hooks
  const { data: tokenBalance } = useGetTokenBalance(
    vault.assetTokenAddress as Address
  );
  const { data: tokenDecimals } = useGetTokenDecimals(
    vault.assetTokenAddress as Address
  );
  const { data: vaultBalance } = useGetVaultBalance(vault.address as Address);

  const currentDate = new Date();
  const endDate = vault.endsAt;
  const startDate = vault.startsAt;

  async function approveToken(amount: bigint) {
    if (!isAddress(vault.address)) {
      throw new Error("Unexpected error, address is invalid");
    }

    if (!isAddress(vault.assetTokenAddress)) {
      throw new Error("Unexpected error, assetToken is invalid");
    }
    const spenderAddress = vault.address;

    const tx = await writeContract(wagmiConfig, {
      abi: erc20Abi,
      address: vault.assetTokenAddress,
      functionName: "approve",
      chainId: sepolia.id,
      args: [spenderAddress, amount],
    });
    return tx;
  }

  useEffect(() => {
    const validateButton = async () => {
      const parsedDepositAmount = parseUnits(removeAmount, tokenDecimals ?? 0);

      if (parsedDepositAmount === 0n) {
        setMessage("Please enter a value");
        setIsButtonDisabled(true);
        return;
      }

      if (vaultBalance ?? 0n === 0n) {
        setMessage("No amount deposited");
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount > vaultBalance) {
        setMessage("Insufficient balance");
        setIsButtonDisabled(true);
        return;
      }
      setIsButtonDisabled(false);
      setMessage("");
    };
    validateButton();
  }, [removeAmount]);

  const { isConnected } = useAccount();

  async function onSubmit() {
    try {
      if (!vault) {
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

      const parsedDepositAmount = parseUnits(removeAmount, tokenDecimals ?? 0);

      const approveTxHash = await approveToken(parsedDepositAmount);

      setMessage("Waiting for transaction");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: approveTxHash,
      });

      if (!isAddress(vault.address)) {
        throw new Error("Unexpected error, assetToken is invalid");
      }

      const simulateTx = await simulateContract(wagmiConfig, {
        abi: abiVault,
        address: vault.address, //Address of contract
        functionName: "withdraw",
        chainId: sepolia.id,
        args: [parsedDepositAmount],
      });

      console.log("Result of simulation:", simulateTx);

      const removeTx = await writeContract(wagmiConfig, {
        abi: abiVault,
        address: vault.address, //Address of contract
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
          vaultId: vault.id,
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
    <div className="flex flex-col p-2 gap-4">
      <div className="flex flex-col gap-2 max-lg:mt-6">
        <h1 className=" text-white text-xl">Withdraw {vault.assetTokenName}</h1>
        <h2 className="text-sm flex flex-wrap items-center gap-2 text-gray-300">
          Claim yours tokens right now!
        </h2>
      </div>

      <div className="flex justify-center">
        <Card className="py-4 px-2" intent={"tertiary"} size={"mediumSmall"}>
          <div className="flex justify-between items-center">
            <h1 className="text-base text-gray-300">Vault token</h1>
            <div className="text-sm text-gray-300">
              Deposited:{" "}
              <span className="text-green-400 font-semibold">
                {Number(
                  formatUnits(vaultBalance ?? 0n, tokenDecimals ?? 0) || 0
                ).toFixed(0)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Input
              className="text-lg text-text-foreground hover:bg-transparent border-transparent"
              intent={"primary"}
              type="number"
              size={"large"}
              placeholder="0"
              onClick={onSubmit}
              onChange={(event) => setRemoveAmount(event.target.value)}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-nowrap text-white">
                {vault.assetTokenName}
              </span>

              <img
                alt="vault-logo"
                className="size-6 rounded-full"
                src={vault.logo}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Action */}
      <Button
        className={`w-full ${
          isButtonDisabled
            ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed shadow-gray-300"
            : "bg-accent hover:bg-purple-600 shadow-shadow"
        }`}
        intent={"secondary"}
        size={"mediumLarge"}
        onClick={onSubmit}
        disabled={isButtonDisabled}
      >
        {message || `Withdraw ${vault.assetTokenName}`}
      </Button>
    </div>
  );
}
