"use client";

import Link from "next/link";
import { Button } from "./interface/button";
import { Card } from "./interface/card";
import { CardLive } from "./vault/vaultCardLive";
import { CardTokens } from "./vault/vaultCardTokens";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { vaultExplore } from "@/utils/atom";
import { Hex } from "viem";

export type Vault = {
  id: number;
  name: string;
  address: Hex;
  startsAt: string;
  endsAt: string;
  banner: string;
  logo: string;
  assetTokenName: string;
};

const cardTokensArray = new Array(10).fill(null);

export function TokenVaults() {
  const [vaultData, setVaultData] = useAtom<Vault[] | null>(vaultExplore);

  async function fetchVaultData() {
    const response = await fetch("/api/getCardLive", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setVaultData(data.vaults);
    }
  }

  useEffect(() => {
    fetchVaultData();
  }, []);

  if (!vaultData) {
    return <p>Loading vault data ...</p>;
  }

  return (
    <div>
      <div className="flex flex-col font-SpaceGrotesk">
        <div className="flex pt-11">
          <h1 className="w-[570px] text-3xl pr-10 text-white">Token Vaults</h1>
          <Link href={`/create-vault-page`}>
            <Button
              className="hover:bg-purple-600"
              intent={"secondary"}
              size={"medium"}
            >
              <div className="size-3 text-accent flex justify-center items-center bg-white rounded-full">
                +
              </div>
              Create a token vault
            </Button>
          </Link>
        </div>
        <h2 className="text-base pl-1 pb-10 text-text-foreground">
          Explore lives and upcoming vaults on Vault Marketplace
        </h2>
        <div className="flex gap-2.5 mb-24">
          {vaultData.map((vault) => (
            <CardLive key={vault.address} vault={vault} />
          ))}
        </div>
        <div className="text-3xl w-[537px] text-white">
          Completed Token Vaults
        </div>
        <div className="text-base text-text-foreground mb-6">
          Take a glance on previous token vaults.
        </div>
        <Card
          className="rounded-t-xl py-3 px-3 gap-2.5 flex"
          intent={"primary"}
          size={"long"}
        >
          <div className="w-24 ml-7">VAULT NAME</div>
          <div className="w-28">PARTICIPANTS</div>
          <div className="w-32">TOTAL DEPOSITED</div>
          <div className="w-32">START DATE</div>
        </Card>
        {cardTokensArray.map((_, index) => (
          <CardTokens key={index} />
        ))}
        <div className="mt-12">.</div>
      </div>
    </div>
  );
}
