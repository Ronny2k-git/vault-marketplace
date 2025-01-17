"use client";

import Link from "next/link";
import { Button } from "./interface/button";
import { Card } from "./interface/card";
import { CardLive } from "./vault/vaultCardLive";
import { CardTokens } from "./vault/vaultCardTokens";

export function TokenVaults() {
  const cardTokensArray = new Array(10).fill(null);
  return (
    <div>
      <div className="flex flex-col font-SpaceGrotesk">
        <div className="flex pt-11">
          <h1 className="w-[570px] text-3xl pr-10">Token Vaults</h1>
          <Link href={`/create-vault`}>
            <Button intent={"secondary"} size={"medium"}>
              <div className="size-3 text-accent flex justify-center items-center bg-white rounded-full">
                +
              </div>
              Create a token vault
            </Button>
          </Link>
        </div>
        <h2 className="text-base pl-1 pb-10">
          Explore lives and upcoming vaults on Vault Marketplace
        </h2>
        <div className="flex gap-2.5 mb-24">
          <CardLive />
          <CardLive />
          <CardLive />
        </div>
        <div className="text-3xl w-[537px] ">Completed Token Vaults</div>
        <div className="text-base text-text-foreground mb-6">
          Take a glance on previous token vaults.
        </div>
        <Card
          className="rounded-t-xl py-3 px-3 gap-2.5"
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
