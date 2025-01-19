"use client";

import { Button } from "../interface/button";
import { Card } from "../interface/card";
import { Input } from "../interface/input";

export function CardRemove() {
  return (
    <div>
      <h1 className="ml-4 mb-2.5 text-white text-xl">Withdraw USDC</h1>
      <h2 className="text-xs ml-4 mb-2.5">
        Deposit yours tokens into a USDC vault for safety!
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
            <div className="text-xs mt-0.5 text-white">USDC</div>
            <img className="size-5 ml-0.5" src="/icons/usdcLogo.png" />
          </div>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button
          className="mt-2.5 w-[270px] shadow-[2px_2px_0px_0px] shadow-shadow"
          intent={"secondary"}
          size={"mediumLarge"}
        >
          Withdraw USDC
        </Button>
      </div>
    </div>
  );
}
