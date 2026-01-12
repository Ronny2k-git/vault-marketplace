"use client";

import { getStatus } from "@/global/utils";
import { abiVault } from "@/utils/abiVault";
import { vault } from "@prisma/client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatUnits, isAddress } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";
import { Button } from "../interface/button";
import { Card } from "../interface/Card";
import { wagmiConfig } from "../Providers";

interface CustomVault extends vault {
  participants?: number;
}

export function CardLive({ vault }: { vault: CustomVault }) {
  const [totalDeposited, setTotalDeposited] = useState(0n);

  const { address } = useAccount();

  const totalAmountDeposited = useCallback(async () => {
    if (!address) return;
    if (!isAddress(vault.address)) return;

    const deposited = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vault.address,
      functionName: "deposited",
      chainId: sepolia.id,
      args: [address],
    });
    setTotalDeposited(deposited);
  }, [vault.address, address]);

  useEffect(() => {
    totalAmountDeposited();
  }, [totalAmountDeposited]);

  return (
    <Card className="h-auto rounded-xl" intent={"primary"}>
      {/* Banner, logo and name */}
      <div className="relative w-full overflow-hidden">
        <img
          alt="vault-banner"
          className="rounded-t-xl aspect-video max-h-52 w-full object-cover"
          src={vault.banner}
        />
        <div className="flex z-10 bottom-2 lg:bottom-2 gap-2 left-2 absolute">
          <img
            alt="vault-logo"
            className="size-8 rounded-full"
            src={vault.logo}
          />
          <div className="font-normal text-white text-base">
            {vault.name}
            <br />
            <div className="text-[10px] -mt-2">Sepolia</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 gap-1">
        {/* Participants */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              alt="participants"
              className="size-4"
              src="/icons/user-group.png"
            />
            Participants:
          </div>
          <div>{vault.participants}</div>
        </div>
        {/* Token Name */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img alt="token-name" className="size-4" src="/icons/token.png" />
            Token name:
          </div>
          <div>{vault.assetTokenName}</div>
        </div>
        {/* Total Deposited */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              alt="total-deposited"
              className="size-4"
              src="/icons/money.png"
            />
            Total deposited:
          </div>
          <div>{formatUnits(totalDeposited, vault.assetTokenDecimals)}</div>
        </div>
        {/* Status */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img alt="vault-status" className="size-4" src="/icons/time.png" />
            Status:
          </div>
          <div
            className={`${
              getStatus(vault) === "Live" ? "text-live-accent" : "text-blue-300"
            }`}
          >
            {getStatus(vault)}
          </div>
        </div>
        {/*  View the vault on your specific page */}
        <div>
          <Link href={`/token-vault/${vault.address}`}>
            <Button intent={"primary"} size={"small"}>
              View now
              <FaArrowRightLong />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
