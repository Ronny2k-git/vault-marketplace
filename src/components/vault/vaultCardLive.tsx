"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readContract } from "wagmi/actions";
import { abiVault } from "@/utils/abiVault";
import { sepolia } from "viem/chains";
import { wagmiConfig } from "../Providers";
import { formatUnits, isAddress } from "viem";
import { useAccount } from "wagmi";
import { vault } from "@prisma/client";

interface CustomVault extends vault {
  participants?: number;
}

export function CardLive({ vault }: { vault: CustomVault }) {
  const [totalDeposited, setTotalDeposited] = useState(0n);

  const { address } = useAccount();

  async function totalAmountDeposited() {
    if (!isAddress(vault.address)) {
      throw new Error("Address is invalid");
    }

    const deposited = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vault.address,
      functionName: "deposited",
      chainId: sepolia.id,
      args: [address!],
    });
    setTotalDeposited(deposited);
  }

  const getStatus = (vault: vault) => {
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
    <Card className="pb-2 h-auto rounded-xl" intent={"primary"}>
      <div className="relative w-full lg:aspect-video overflow-hidden flex-grow-0">
        <img
          className="rounded-t-xl h-40 w-full object-cover"
          src={vault.banner}
        />
        <div className="flex z-10 bottom-2 lg:bottom-2 gap-2 left-2 absolute">
          <img className="size-8 rounded-full" src={vault.logo} />
          <div className="font-normal text-white text-base">
            {vault.name}
            <br />
            <div className="text-[10px] -mt-2">Sepolia</div>
          </div>
        </div>
      </div>
      <div className="flex mt-4 ml-4 font-SpaceGrotesk justify-between mr-4 max-md:flex-col">
        <div className="flex">
          <img className="size-4 mr-1" src="/icons/user-group.png" />
          <div>Participants:</div>
        </div>
        <div>{vault.participants}</div>
      </div>
      <div className="flex ml-4 font-SpaceGrotesk justify-between mr-4 max-md:flex-col">
        <div className="flex">
          <img className="size-4 mr-1" src="/icons/token.png" />
          <div>Token name: </div>
        </div>
        <div>{vault.assetTokenName}</div>
      </div>
      <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4 max-md:flex-col">
        <div className="flex">
          <img className="size-4 mr-1" src="/icons/money.png" />
          <div>Total deposited: </div>
        </div>
        <div>{formatUnits(totalDeposited, vault.assetTokenDecimals)}</div>
      </div>
      <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4 max-md:flex-col">
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
      <div className="ml-4 mt-auto self-end">
        <Link href={`/token-vault/${vault.address}`}>
          <Button intent={"primary"} size={"small"}>
            View now
            <FaArrowRightLong />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
