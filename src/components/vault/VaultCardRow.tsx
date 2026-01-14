"use client";

import { useGetVaultBalance } from "@/global/hooks";
import { vault } from "@prisma/client";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { Address, formatUnits } from "viem";
import { Button } from "../interface/Button";
import { Card } from "../interface/Card";

interface CustomVault extends vault {
  participants?: number;
}
export function VaultCardRow({ vault }: { vault: CustomVault }) {
  const { data: vaultBalance } = useGetVaultBalance(vault.address as Address);

  return (
    <div className="w-full relative">
      <Card
        className="flex rounded-2xl px-2 py-2 min-w-[50rem] items-center"
        intent={"primary"}
      >
        <img
          alt="Vault logo"
          className="size-10 mr-4 rounded-full"
          src={vault.logo}
        />
        <div className="flex-1">
          {vault.name}
          <br /> {vault.chainId === 11155111 ? "Sepolia" : "Sepolia"}
        </div>
        <div className="flex-1">{vault.participants}</div>
        <div className="flex flex-1 gap-2">
          <p>{formatUnits(vaultBalance ?? 0n, vault.assetTokenDecimals)}</p>
          {vault.assetTokenName}
        </div>
        <div className="flex-1">
          {new Date(vault.startsAt).toLocaleDateString("en-US")}
        </div>
        <Link
          className="flex items-center"
          href={`/token-vault/${vault.address}`}
        >
          <Button intent={"primary"} size={"small"}>
            View now
            <FaArrowRightLong />
          </Button>
        </Link>
      </Card>
    </div>
  );
}
