"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import { useGetVaultBalance } from "@/global/hooks";
import { getStatus } from "@/global/utils";
import { Tabs } from "@radix-ui/themes";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Address, formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { CountDownClock } from "../countDownClock";
import { Button } from "../interface/Button";
import { Card } from "../interface/Card";
import { useWithdraw } from "../swap/hooks";
import { VaultCardDeposit } from "./VaultCardDeposit";
import { VaultCardRemove } from "./VaultCardRemove";
import { VaultCardTransactionStatus } from "./VaultCardTransactionStatus";

export const statusClasses: Record<string, string> = {
  Live: "text-live-accent ml-1",
  Coming: "text-blue-400 ml-1",
  Finished: "text-red-400 ml-1",
};

export function VaultCardTransaction({
  vault,
  className,
}: {
  vault: VaultFromDb;
  className?: string;
}) {
  // Hooks
  const { data: vaultBalance, refetch: refetchBalance } = useGetVaultBalance(
    vault.address as Address
  );
  const { withdraw } = useWithdraw();

  // State
  const [withdrawAllMessage, setWithdrawAllMessage] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const { address: userAddress } = useAccount();

  const depositedValue = formatUnits(
    vaultBalance ?? 0n,
    vault.assetTokenDecimals
  );

  const statusClass = statusClasses[getStatus(vault)] ?? "text-gray-400 ml-1";

  const onWithdrawAll = async () => {
    try {
      setIsWithdrawing(true);

      const txHash = await withdraw({
        amount: depositedValue,
        message: setWithdrawAllMessage,
        tokenDecimals: vault.assetTokenDecimals ?? 0,
        vault,
      });

      if (!txHash) return;

      const parsedDepositAmount = parseUnits(
        depositedValue,
        vault.assetTokenDecimals ?? 0
      );

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

      setWithdrawAllMessage("Transaction successfull");
      refetchBalance();
      return data;
    } catch (error) {
      console.log("❌ Error Withdrawing:", error);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <Card
      className={twMerge(
        `flex flex-col max-lg:w-full max-lg:max-w-2xl min-h-[23rem] max-h-[23rem] 
        items-center max-w-sm border border-gray-500`,
        className
      )}
      intent={"secondary"}
      size={"medium"}
    >
      <div className="p-2 flex w-full items-center justify-between text-base text-text-foreground">
        <div className="flex gap-2">
          <p>Status:</p>

          <span className={`${statusClass}`}>{getStatus(vault)}</span>
        </div>

        <CountDownClock key={vault.id} vault={vault} />
      </div>

      <Card
        className="flex flex-col pb-2 h-full"
        intent={"primary"}
        size={"medium"}
      >
        {getStatus(vault) === "Live" ? (
          <Tabs.Root defaultValue="Deposit">
            <Tabs.List
              size="2"
              color="green"
              className="h-10 text-sm data-[state=active]:bg-button-bg-primary "
            >
              <Tabs.Trigger
                className="data-[state=active]:bg-button-bg-primary !text-white !w-1/2 !rounded-br-xl 
                !rounded-tl-xl !font-SpaceGrotesk"
                value="Deposit"
              >
                Deposit
              </Tabs.Trigger>
              <Tabs.Trigger
                className="data-[state=active]:bg-button-bg-primary !text-white !w-1/2
                !rounded-bl-2xl !rounded-tr-xl !font-SpaceGrotesk"
                value="Withdraw"
              >
                Withdraw
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="Deposit">
              <VaultCardDeposit vault={vault} />
            </Tabs.Content>
            <Tabs.Content value="Withdraw">
              <VaultCardRemove vault={vault} />
            </Tabs.Content>
          </Tabs.Root>
        ) : (
          <VaultCardTransactionStatus
            status={status === "Coming" ? "Coming" : "Finished"}
            title={
              status === "Coming" ? "Vault not started yet" : "Vault has ended"
            }
            description={
              status === "Upcoming"
                ? "You will be able to deposit once the vault is live."
                : "Deposits and withdrawals are no longer available."
            }
            vault={vault}
            vaultBalance={depositedValue}
            handleWithdraw={
              <Button
                className=" w-full border border-gray-950"
                onClick={onWithdrawAll}
                disabled={isWithdrawing || vaultBalance === 0n}
                intent={
                  isWithdrawing || vaultBalance === 0n ? "primary" : "glow"
                }
                size={"large"}
              >
                {withdrawAllMessage || "Withdraw all your tokens"}
              </Button>
            }
          />
        )}
      </Card>
    </Card>
  );
}
