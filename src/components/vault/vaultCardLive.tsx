"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import Link from "next/link";
import { Vault } from "../homePage";
import { useEffect, useState } from "react";
import { readContract } from "wagmi/actions";
import { abiVault } from "@/utils/abiVault";
import { sepolia } from "viem/chains";
import { wagmiConfig } from "../provider";
import { useAtom } from "jotai";

export function CardLive({ vault }: { vault: Vault }) {
  const [totalDeposited, setTotalDeposited] = useState("");
  // const [vaultData] = useAtom<Vault[] | null>(vaultExplore);

  async function totalAmountDeposited() {
    const deposited = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vault.address,
      functionName: "deposited",
      chainId: sepolia.id,
      args: ["0x5e99E02629C14E36c172304a4255c37FB45065CC"],
    });
    setTotalDeposited(deposited.toString());
    console.log(deposited);
  }

  const getStatus = (vault: Vault) => {
    const currentDate = new Date();
    const startDate = new Date(vault.startsAt);
    const endDate = new Date(vault.endsAt);

    if (startDate > currentDate) {
      return "Coming soon";
    }
    if (startDate <= currentDate && currentDate < endDate) {
      return "Live";
    } else {
      return "Finished";
    }
  };

  useEffect(() => {
    totalAmountDeposited();
  }, []);

  return (
    <div>
      <Card intent={"primary"} size={"small"}>
        <div className="relative w-full h-fit aspect-video overflow-hidden flex-grow-0">
          <img
            className="rounded-t-xl size-full object-cover"
            src={vault.banner}
          />
          <div className="flex z-40 bottom-2 gap-2 left-2 absolute">
            <img className="size-8 rounded-full" src={vault.logo} />
            <div className=" font-normal text-white text-base">
              {vault.name}
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
            <img className="size-4 mr-1" src="/icons/token.png" />
            <div>Token name: </div>
          </div>
          <div>{vault.assetTokenName}</div>
        </div>
        <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <img className="size-4 mr-1" src="/icons/money.png" />
            <div>Total deposited: </div>
          </div>
          <div>{totalDeposited}</div>
        </div>
        <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <img className="size-4 mr-1" src="/icons/time.png" />
            <div>Status:</div>
          </div>
          <div
            className={`${
              getStatus(vault) === "Live" ? "text-live-accent" : "text-blue-300"
            }`}
          >
            {getStatus(vault)}
          </div>
        </div>
        <div className="ml-4 mt-2">
          <Link href={`/token-vault/${vault.address}`}>
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
