"use client";

import { Tabs } from "@radix-ui/themes";
import { Card } from "../interface/card";
import { CardDeposit } from "./vaultCardDeposit";
import { CardRemove } from "./vaultCardRemove";
import { vaultAtom } from "@/utils/atom";
import { useAtom } from "jotai";
import { CountDownClock } from "../countDownClock";

export function CardTransaction() {
  const [vaultData] = useAtom(vaultAtom);

  const getStatus = () => {
    const currentDate = new Date();
    const startDate = new Date(vaultData.startsAt);
    const endDate = new Date(vaultData.endsAt);

    if (!vaultData) {
      return "No vault data";
    }

    if (startDate > currentDate) {
      return "Coming soon";
    }
    if (startDate < currentDate && currentDate < endDate) {
      return "Live";
    } else {
      return "Finished";
    }
  };

  return (
    <div>
      <Card className="flex flex-col" intent={"secondary"} size={"mediumLarge"}>
        <div className="px-4 py-2 flex items-center text-sm text-text-foreground">
          Status:
          <p
            className={
              getStatus() === "Live"
                ? "text-live-accent ml-1"
                : "text-blue-400 ml-1"
            }
          >
            {getStatus()}
          </p>
          <CountDownClock />
        </div>

        <Card className="flex flex-col" intent={"primary"} size={"medium"}>
          <Tabs.Root defaultValue="Deposit">
            <Tabs.List
              size="1"
              color="gray"
              className="h-7 text-xs data-[state=active]:bg-button-bg-primary "
            >
              <Tabs.Trigger
                className="data-[state=active]:bg-button-bg-primary !text-white !w-36 !rounded-br-2xl 
                !rounded-tl-xl !font-SpaceGrotesk"
                value="Deposit"
              >
                Deposit
              </Tabs.Trigger>
              <Tabs.Trigger
                className="data-[state=active]:bg-button-bg-primary !text-white !w-36
                !rounded-bl-2xl !rounded-tr-xl !font-SpaceGrotesk"
                value="Withdraw"
              >
                Withdraw
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="Deposit">
              <CardDeposit />
            </Tabs.Content>
            <Tabs.Content value="Withdraw">
              <CardRemove />
            </Tabs.Content>
          </Tabs.Root>
        </Card>
      </Card>
    </div>
  );
}
