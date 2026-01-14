"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import { getStatus } from "@/global/utils";
import { Tabs } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";
import { CountDownClock } from "../countDownClock";
import { Card } from "../interface/Card";
import { VaultCardDeposit } from "./VaultCardDeposit";
import { VaultCardRemove } from "./VaultCardRemove";
import { VaultCardTransactionStatus } from "./VaultCardTransactionStatus";

export function VaultCardTransaction({
  vault,
  className,
}: {
  vault: VaultFromDb;
  className?: string;
}) {
  return (
    <Card
      className={twMerge(
        `flex flex-col max-lg:w-full max-lg:max-w-2xl h-[26rem] p-2 lg:max-h-[23rem] 
        items-center max-w-sm border border-gray-500`,
        className
      )}
      intent={"secondary"}
      size={"medium"}
    >
      <div className="p-2 flex w-full items-center justify-between text-base text-text-foreground">
        <div className="flex gap-2">
          <p>Status:</p>

          <div
            className={
              getStatus(vault) === "Live"
                ? "text-live-accent ml-1"
                : "text-blue-400 ml-1"
            }
          >
            {getStatus(vault)}
          </div>
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
          />
        )}
      </Card>
    </Card>
  );
}
