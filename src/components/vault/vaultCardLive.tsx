"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import Link from "next/link";
import { useEffect, useState } from "react";

type Vault = {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
};

export function CardLive() {
  const [vaultData, setVaultData] = useState<Vault[]>([]);

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
    fetchVaultData;
  }, []);

  return (
    <div>
      <Card intent={"primary"} size={"small"}>
        <div className="relative w-full h-fit aspect-video overflow-hidden flex-grow-0">
          <img
            className="rounded-t-xl size-full object-cover"
            src="/usdc.png"
          />
          <div className="flex z-40 bottom-2 gap-2 left-2 absolute">
            <img className="size-8" src="/icons/usdcLogo.png" />
            <div className=" font-normal text-white text-base">
              USDC Vault
              <br />
              <div className="text-[10px] -mt-2">Sepolia</div>
            </div>
          </div>
        </div>
        <div className="flex mt-4 ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <img className="size-4 mr-1" src="/icons/user-group.png" />
            <div>Participants:</div>
          </div>
          <div>4</div>
        </div>
        <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <img className="size-4 mr-1" src="/icons/money.png" />
            <div>Total deposited:</div>
          </div>
          <div>5,600 USD</div>
        </div>
        <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <img className="size-4 mr-1" src="/icons/time.png" />
            <div>Status:</div>
          </div>
          <div className="text-live-accent">Live</div>
        </div>
        <div className="ml-4 mt-2">
          <Link href={`/token-vault/1`}>
            <Button intent={"primary"} size={"small"}>
              View now
              <FaArrowRightLong />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
