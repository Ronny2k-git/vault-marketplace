"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import {
  useApproveToken,
  useGetTokenBalance,
  useGetTokenDecimals,
  useGetVaultBalance,
  useGetVaultDepositLimits,
} from "@/global/hooks";
import { abiVault } from "@/utils/abiVault";
import { useEffect, useState } from "react";
import { Address, formatUnits, Hex, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { Button } from "../interface/Button";
import { Card } from "../interface/Card";
import { Input } from "../interface/input";
import { wagmiConfig } from "../Providers";

export function VaultCardDeposit({ vault }: { vault: VaultFromDb }) {
  // Atoms
  const [depositAmount, setDepositAmount] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");

  // Hooks
  const { data: tokenBalance } = useGetTokenBalance(
    vault.assetTokenAddress as Address
  );
  const { data: tokenDecimals } = useGetTokenDecimals(
    vault.assetTokenAddress as Address
  );
  const { minDeposit, maxDeposit } = useGetVaultDepositLimits(
    vault.address as Address
  );
  const { data: vaultBalance } = useGetVaultBalance(vault.address as Address);

  const { approve } = useApproveToken();

  // Vault infos
  const currentDate = new Date();
  const endDate = vault.endsAt;
  const startDate = vault.startsAt;

  const { isConnected } = useAccount();

  useEffect(() => {
    const validateButtonState = async () => {
      const parsedDepositAmount = parseUnits(depositAmount, tokenDecimals ?? 0);

      if (parsedDepositAmount === 0n) {
        setMessage("Please enter a value");
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount > (vaultBalance ?? 0n)) {
        setMessage("Insufficient balance"); // Balance for deposit
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount < minDeposit) {
        setMessage("The minimum deposit has not been reached"); // Minimum deposit per wallet
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount > maxDeposit) {
        setMessage("the maximum deposit has been exceeded"); // Maximum deposit per wallet
        setIsButtonDisabled(true);
        return;
      }

      if (parsedDepositAmount + (vaultBalance ?? 0n) > maxDeposit) {
        setMessage("The maximum deposit has been exceeded"); // Balance +input > Maximum deposit per wallet
        setIsButtonDisabled(true);
        return;
      }

      setIsButtonDisabled(false);
      setMessage("");
    };

    validateButtonState();
  }, [depositAmount, tokenDecimals, vaultBalance, minDeposit, maxDeposit]);

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

      const parsedDepositAmount = parseUnits(depositAmount, tokenDecimals ?? 0);

      const approveTxHash = await approve({
        amount: parsedDepositAmount,
        spenderAddress: vault.address as Address,
        tokenAddress: vault.assetTokenAddress as Address,
      });

      setMessage("Waiting for approval receipt");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: approveTxHash,
      });

      if (!vault) {
        return "Loading vault data";
      }

      const simulateDeposit = await simulateContract(wagmiConfig, {
        abi: abiVault,
        address: vault.address as Hex,
        functionName: "deposit",
        chainId: sepolia.id,
        args: [parsedDepositAmount],
      });

      console.log("Simulation Successfull:", simulateDeposit);

      const depositTx = await writeContract(wagmiConfig, {
        abi: abiVault,
        address: vault.address as Hex, //Address of contract
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
          vaultId: vault.id,
        }),
      });
      const data = await response.json();

      console.log("Deposit transaction sent:", data);
      setMessage("Deposit successfull");
    } catch (error) {
      console.error("Error in transaction", error);
    }
  }

  if (!vault) {
    return <p className="text-red-500">Loading vault data ...</p>;
  }

  return (
    <div className="flex flex-col p-2 gap-4">
      <div className="flex flex-col gap-2 max-lg:mt-6">
        <h1 className=" text-white text-xl">Deposit {vault.assetTokenName}</h1>
        <h2 className="text-sm text-gray-300">
          Deposit yours tokens into a {vault.name} for safety!
        </h2>
      </div>

      <div className="flex justify-center">
        <Card className="py-4 px-2" intent={"tertiary"} size={"mediumSmall"}>
          <div className="flex justify-between items-center">
            <h1 className="text-base text-gray-300">Vault token</h1>
            <div className="text-sm text-gray-300">
              Balance:{" "}
              <span className="text-green-400 font-semibold">
                {Number(
                  formatUnits(tokenBalance ?? 0n, tokenDecimals ?? 0) || 0
                ).toFixed(0)}
              </span>
            </div>
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
            ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed shadow-gray-400"
            : "bg-accent hover:bg-purple-600 shadow-shadow"
        }`}
        intent={"secondary"}
        size={"mediumLarge"}
        onClick={onSubmit}
        disabled={isButtonDisabled}
      >
        {message || `Deposit ${vault.assetTokenName}`}
      </Button>
    </div>
  );
}
