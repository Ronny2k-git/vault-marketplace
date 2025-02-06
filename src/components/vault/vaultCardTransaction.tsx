"use client";

import { Tabs } from "@radix-ui/themes";
import { Card } from "../interface/card";
import { CardDeposit } from "./vaultCardDeposit";
import { CardRemove } from "./vaultCardRemove";
import { useEffect, useState } from "react";

type Vault = {
  id: number;
  address: string;
  name: string;
  startsAt: string;
  endsAt: string;
  banner: string;
  logo: string;
};

export function CardTransaction() {
  const [vaultToken, setVaults] = useState<Vault | null>(null);

  async function fetchVaultToken() {
    const response = await fetch("/api/getTokenAddress", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setVaults(data.vault[2]);
    }

    console.log(data);
  }

  useEffect(() => {
    fetchVaultToken();
  }, []);
  return (
    <div>
      <Card className="flex flex-col" intent={"secondary"} size={"mediumLarge"}>
        <h1 className="mt-4 ml-4 flex text-sm text-text-foreground">
          Status: <p className="ml-1 text-live-accent">Live</p>
        </h1>
        <div className="ml-4 text-base mb-2 text-text-foreground">
          01 : 20 : 55
        </div>
        <Card className="flex flex-col" intent={"primary"} size={"medium"}>
          <Tabs.Root defaultValue="Deposit">
            <Tabs.List
              size="1"
              color="gray"
              className="h-7 text-xs data-[state=active]:bg-button-bg-primary  "
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
