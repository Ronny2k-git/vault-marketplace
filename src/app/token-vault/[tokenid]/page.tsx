"use client";

import { Button } from "@/components/interface/button";
import { Card } from "@/components/interface/card";
import { Input } from "@/components/interface/input";
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
              className="rounded-t-xl text-xs flex"
              intent={"primary"}
              size={"mediumLong"}
            >
              <div className="w-20 ml-2">AMOUNT</div>
              <div className="w-28">ACCOUNT</div>
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
            <h1 className="mt-4 ml-4 flex text-sm">
              Status: <p className="ml-1 text-live-accent">Live</p>
            </h1>
            <div className="ml-4 text-base mb-2 text-text-foreground">
              01 : 20 : 55
            </div>
            <Card className="flex flex-col" intent={"primary"} size={"medium"}>
              <div className="w-full flex justify-center">
                <h1 className="pl-11 w-36 py-1.5 gap-2.5 rounded-ss-xl hover:bg-button-bg-primary">
                  Deposit
                </h1>
                <h2 className="w-36 py-1.5 px-4 pl-10 rounded-tr-xl hover:bg-button-bg-primary">
                  Withdraw
                </h2>
              </div>
              <h1 className="ml-4 mb-2.5 text-white text-xl">Deposit USDC</h1>
              <h2 className="text-xs ml-4 mb-2.5">
                Deposit yours tokens into a USDC vault for safety!
              </h2>
              <div className="flex justify-center">
                <Card intent={"tertiary"} size={"mediumSmall"}>
                  <div className="flex justify-between">
                    <h1 className="text-sm ml-2 pb-1 mt-1">Vault token</h1>
                    <h2 className="text-xs mr-2 mt-2">Balance: 10,298.23</h2>
                  </div>
                  <div className="flex">
                    <Input
                      className="text-xs text-text-foreground hover:bg-transparent border-transparent"
                      intent={"primary"}
                      size={"large"}
                    ></Input>
                    <div className="text-xs mt-0.5 text-white">USDC</div>
                    <img className="size-5 ml-0.5" src="/icons/usdcLogo.png" />
                  </div>
                </Card>
              </div>
              <div className="flex justify-center">
                <Button className="mt-2.5" intent={"secondary"} size={"small"}>
                  Deposit USDC
                </Button>
              </div>
            </Card>
          </Card>
        </div>
        <div className="text-[13px] mr-72 mt-2">
          {"<"} 1 2 3 ... 20 {">"}
        </div>
      </div>
    </div>
  );
}
