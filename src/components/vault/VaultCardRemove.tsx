"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import {
  useGetTokenBalance,
  useGetTokenDecimals,
  useGetVaultBalance,
  useGetVaultDepositLimits,
  useValidateVaultTransaction,
} from "@/global/hooks";
import { useState } from "react";
import { Address, formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { Button } from "../interface/Button";
import { Card } from "../interface/Card";
import { Input } from "../interface/input";
import { useWithdraw } from "../swap/hooks";

export function VaultCardRemove({ vault }: { vault: VaultFromDb }) {
  // States
  const [removeAmount, setRemoveAmount] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const { address: userAddress } = useAccount();

  // Vault hooks
  const { data: vaultBalance } = useGetVaultBalance(vault.address as Address);
  const { minDeposit, maxDeposit } = useGetVaultDepositLimits(
    vault.address as Address
  );

  // Token hooks
  const { data: tokenBalance } = useGetTokenBalance(
    vault.assetTokenAddress as Address
  );
  const { data: tokenDecimals } = useGetTokenDecimals(
    vault.assetTokenAddress as Address
  );

  //Transaction hooks
  const { isButtonDisabled, message } = useValidateVaultTransaction({
    mode: "withdraw",
    amount: removeAmount,
    userTokenBalance: tokenBalance,
    tokenDecimals,
    vaultBalance,
    minDeposit,
    maxDeposit,
  });

  const { withdraw } = useWithdraw();

  async function onSubmit() {
    try {
      // Hook used to withdraw in a vault
      const txHash = await withdraw({
        message: setSubmitMessage,
        amount: removeAmount,
        tokenDecimals: tokenDecimals ?? 0,
        vault,
      });

      if (!txHash) return;

      const parsedDepositAmount = parseUnits(removeAmount, tokenDecimals ?? 0);

      // Save the transaction to the database
      const response = await fetch("/api/createSwap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedDepositAmount.toString(),
          type: "withdraw",
          txHash: txHash.hash,
          sender: userAddress,
          vaultId: vault.id,
        }),
      });

      const data = await response.json();

      setSubmitMessage("Transaction successfull");
      setRemoveAmount("");
      return data;
    } catch (error) {
      setSubmitMessage("");
      console.error("❌ Error Withdrawing:", error);
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

          <div className="flex max-sm:flex-col items-center justify-between gap-2">
            <Input
              className="text-2xl lg:max-w-[12rem] text-white hover:bg-transparent"
              intent={"primary"}
              type="number"
              size={"large"}
              placeholder="0"
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
        className={`border border-gray-400 ${
          isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        intent={isButtonDisabled ? "primary" : "secondary"}
        size={"mediumLarge"}
        onClick={onSubmit}
        disabled={isButtonDisabled}
      >
        {message || submitMessage || `Withdraw ${vault.assetTokenName}`}
      </Button>
    </div>
  );
}
