"use client";

import { createVaultAtom } from "@/utils/atom";
import { useAtom } from "jotai";
import { Card } from "../interface/Card";

export function CardPreview() {
  const [
    {
      bannerUrl,
      vaultLogo,
      vaultName,
      network,
      minDeposit,
      maxDeposit,
      startDate,
      endDate,
    },
  ] = useAtom(createVaultAtom);

  return (
    <Card
      className="flex flex-col rounded-2xl max-[850px]:w-full size-[22rem] h-auto"
      intent={"primary"}
      size={"small"}
    >
      <div className="w-full relative">
        <img
          alt="vault-banner"
          className="z-10 rounded-t-2xl aspect-video w-full object-cover bg-center"
          src={bannerUrl || "/backgroundCard.png"}
          onError={(e) => (e.currentTarget.src = "/backgroundCard.png")}
        />

        <div className="flex z-20 gap-2 bottom-1 left-2 absolute">
          <img
            alt="vault-logo"
            className="size-8 rounded-full bg-center bg-cover"
            src={vaultLogo || "/icons/Frame.png"}
          />
          <div className=" font-normal text-white">
            {vaultName || "Unammed"}
            <br />
            <div className="text-xs">{network || "No chain selected"}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 p-4 gap-1">
        <h3>Minimum Deposit</h3>
        <span className="text-end">{minDeposit}</span>
        <h3>Max dep.per wallet</h3>
        <span className="text-end">{maxDeposit}</span>
        <h3>Start Date</h3>
        <span className="text-end">
          {startDate?.toLocaleDateString("en-US") || "00/00/0000"}
        </span>
        <h3>End Date</h3>
        <span className="text-end">
          {endDate?.toLocaleDateString("en-US") || "00/00/0000"}
        </span>
      </div>
    </Card>
  );
}
