"use client";

import { useGetVaultBalance } from "@/global/hooks";
import { getStatus } from "@/global/utils";
import { vault } from "@prisma/client";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { Address, formatUnits } from "viem";
import { Button } from "../interface/Button";
import { Card } from "../interface/Card";

interface CustomVault extends vault {
  participants?: number;
}

export function CardLive({ vault }: { vault: CustomVault }) {
  const { data: vaultBalance } = useGetVaultBalance(vault.address as Address);

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
          <div>{formatUnits(vaultBalance ?? 0n, vault.assetTokenDecimals)}</div>
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
        <Link className="mt-4" href={`/token-vault/${vault.address}`}>
          <Button intent={"primary"} size={"small"}>
            View now
            <FaArrowRightLong />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
