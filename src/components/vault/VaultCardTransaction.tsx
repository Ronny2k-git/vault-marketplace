"use client";

import { getStatus } from "@/global/utils";
import { vaultAtom } from "@/utils/atom";
import { Tabs } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { CountDownClock } from "../countDownClock";
import { Card } from "../interface/Card";
import { VaultCardDeposit } from "./VaultCardDeposit";
import { VaultCardRemove } from "./VaultCardRemove";

export function VaultCardTransaction() {
  const [vaultData] = useAtom(vaultAtom);

  return (
    <Card
      className="flex flex-col max-lg:w-full max-lg:max-w-2xl h-[26rem] p-2 lg:max-h-[23rem] items-center max-w-sm border bg-black/5 border-gray-500"
      intent={"secondary"}
      size={"medium"}
    >
      <div className="p-2 flex w-full items-center justify-between text-base text-text-foreground">
        <div className="flex gap-2">
          <p>Status:</p>

          <div
            className={
              getStatus(vaultData) === "Live"
                ? "text-live-accent ml-1"
                : "text-blue-400 ml-1"
            }
          >
            {getStatus(vaultData)}
          </div>
        </div>

        <CountDownClock />
      </div>

      <Card
        className="flex flex-col pb-2 h-full"
        intent={"secondary"}
        size={"medium"}
      >
        <Tabs.Root defaultValue="Deposit">
          <Tabs.List
            size="2"
            color="gold"
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
            <VaultCardDeposit />
          </Tabs.Content>
          <Tabs.Content value="Withdraw">
            <VaultCardRemove />
          </Tabs.Content>
        </Tabs.Root>
      </Card>
    </Card>
  );
}
