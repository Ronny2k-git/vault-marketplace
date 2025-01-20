"use client";

import { Tabs } from "@radix-ui/themes";
import { Card } from "../interface/card";
import { CardDeposit } from "./vaultCardDeposit";
import { CardRemove } from "./vaultCardRemove";

export function CardTransaction() {
  return (
    <div>
      <Card className="flex flex-col" intent={"secondary"} size={"mediumLarge"}>
        <h1 className="mt-4 ml-4 flex text-sm">
          Status: <p className="ml-1 text-live-accent">Live</p>
        </h1>
        <div className="ml-4 text-base mb-2 text-text-foreground">
          01 : 20 : 55
        </div>
        <Card className="flex flex-col" intent={"primary"} size={"medium"}>
          <Tabs.Root defaultValue="Deposit">
            <Tabs.List className="w-full flex justify-center">
              <Tabs.Trigger
                value="Deposit"
                className="pl-11 text-xs text-white hover:bg-button-bg-primary w-36 py-1.5 gap-2.5 rounded-br-xl
                rounded-tl-xl"
              >
                Deposit
              </Tabs.Trigger>
              <Tabs.Trigger
                value="Withdraw"
                className="w-36 text-xs py-1.5 text-white hover:bg-button-bg-primary px-4 pl-10 rounded-bl-xl 
                rounded-tr-xl"
              >
                Withdraw
              </Tabs.Trigger>
            </Tabs.List>
            {""}
            <Tabs.Content value="Deposit">
              <CardDeposit />
            </Tabs.Content>
            {""}
            <Tabs.Content value="Withdraw">
              <CardRemove />
            </Tabs.Content>
          </Tabs.Root>
        </Card>
      </Card>
    </div>
  );
}
