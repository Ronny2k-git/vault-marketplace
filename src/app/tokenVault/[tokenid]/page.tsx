"use client";

import { Card } from "@/components/card";

export default function Token() {
  return (
    <div className="h-screen w-[calc(screen-1px)] bg-background font-SpaceGrotesk">
      <div className="h-full w-full flex flex-col justify-center items-center">
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
        <div className="mt-4 flex gap-5 mr-48 mb-52">
          <div>
            <div className="text-sm">Start date</div>
            <div className="text-xs">00/00/0000</div>
          </div>
          <div>
            <div className="text-sm">End date</div>
            <div className="text-xs">00/00/0000</div>
          </div>
          <div>
            <div className="text-sm">Max.deposite per wallet.</div>
            <div className="text-xs">5,400.50 USDC</div>
          </div>
          <div>
            <div className="text-sm">Min.deposit per wallet.</div>
            <div className="text-xs">500 USDC</div>
          </div>
        </div>
        test
      </div>
    </div>
  );
}
