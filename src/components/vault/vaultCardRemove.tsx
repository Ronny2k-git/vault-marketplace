"use client";

import { vaultAtom } from "@/utils/atom";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import { useAtom } from "jotai";
import { Vault } from "@/app/token-vault/[tokenAddress]/page";

export function CardRemove() {
  const [vaultData] = useAtom<Vault | null>(vaultAtom);

  if (!vaultData) {
    return <p className="tet-red-500">Loading vault data ...</p>;
  }
  return (
    <div>
      <h1 className="ml-4 mb-2.5 text-white text-xl">
        Withdraw {vaultData.assetTokenName}
      </h1>
      <h2 className="text-xs ml-4 mb-2.5">
        Deposit yours tokens into a {vaultData.name} for safety!
      </h2>
      <div className="flex justify-center">
        <Card intent={"tertiary"} size={"mediumSmall"}>
          <div className="flex justify-between">
            <h1 className="text-sm ml-2 pb-1 mt-1">Vault token</h1>
            <h2 className="text-xs mr-2 mt-2">Deposited: 10,298.23</h2>
          </div>
          <div className="flex">
            <Input
              className="text-xs text-text-foreground hover:bg-transparent border-transparent"
              intent={"primary"}
              size={"large"}
              placeholder="0"
            ></Input>
            <div className="text-xs mt-0.5 text-white">
              {vaultData.assetTokenName}
            </div>
            <img className="size-5 ml-0.5" src={vaultData.logo} />
          </div>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button
          className="mt-2.5 w-[270px]"
          intent={"secondary"}
          size={"mediumLarge"}
        >
          Withdraw {vaultData.assetTokenName}
        </Button>
      </div>
    </div>
  );
}
