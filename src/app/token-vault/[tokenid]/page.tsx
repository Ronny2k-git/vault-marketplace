"use client";

import { Card } from "@/components/interface/card";
import { TransactionTokens } from "@/components/vault/vaultCardTokens";

export default function Token() {
  const cardTokensArray = new Array(10).fill(null);

  return (
    <div className="h-screen w-[calc(screen-1px)] bg-background font-SpaceGrotesk">
      <div className="h-full w-full flex flex-col pt-12 items-center">
        <Card className="relative" intent={"primary"} size={"large"}>
          <img className="size-full object-cover rounded-2xl" src="/usdc.png" />
          <div className="flex absolute bottom-3">
            <img className="size-11 ml-4 mr-1" src="/icons/usdcLogo.png" />
            <div className="flex flex-col">
              <div className="text-2xl font-bold">USDC Vault</div>
              <div className="-mt-1 text-base">Sepolia</div>
            </div>
          </div>
        </Card>
        <div className="mt-4 flex gap-5 mr-56 mb-4">
          <div>
            <div className="text-sm">Start date</div>
            <div className="text-xs text-text-foreground">00/00/0000</div>
          </div>
          <div>
            <div className="text-sm">End date</div>
            <div className="text-xs text-text-foreground">00/00/0000</div>
          </div>
          <div>
            <div className="text-sm">Max.deposite per wallet.</div>
            <div className="text-xs text-text-foreground">5,400.50 USDC</div>
          </div>
          <div>
            <div className="text-sm">Min.deposit per wallet.</div>
            <div className="text-xs text-text-foreground">500 USDC</div>
          </div>
        </div>
        <div className="flex gap-2.5">
          <div className="flex flex-col">
            <Card
              className="rounded-t-xl text-xs"
              intent={"primary"}
              size={"mediumLong"}
            >
              <div className="w-20 ml-2">AMOUNT</div>
              <div className="w-32">ACCOUNT</div>
              <div className="w-20">TIME</div>
              <div className="w-28">TYPE</div>
            </Card>
            {cardTokensArray.map((_, index) => (
              <TransactionTokens key={index} />
            ))}
          </div>
          <Card
            className="flex flex-col"
            intent={"secondary"}
            size={"mediumLarge"}
          >
            <h1 className="mt-4 ml-4 flex">
              Status: <p className="ml-1 text-live-accent">Live</p>
            </h1>
            <div className="ml-5 text-base mb-4 text-text-foreground">
              01 : 20 : 55
            </div>
            <Card className="flex flex-col" intent={"primary"} size={"medium"}>
              <h1 className="ml-4 text-white text-xl">Deposit USDC</h1>
              <h2 className="text-xs ml-4 mb-2.5">
                Deposit yours tokens into a USDC vault for safety!
              </h2>
            </Card>
          </Card>
        </div>
        <div className="text-[13px] mr-72 mt-2">1 2 3 ... 20</div>
      </div>
    </div>
  );
}
