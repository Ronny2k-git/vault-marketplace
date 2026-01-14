"use client";

import { abiVault } from "@/utils";
import { vault } from "@prisma/client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatUnits, isAddress } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";
import { Button } from "../interface/Button";
import { Card } from "../interface/Card";
import { wagmiConfig } from "../Providers";

interface CustomVault extends vault {
  participants?: number;
}
export function VaultCardRow({ vault }: { vault: CustomVault }) {
  const [totalDeposited, setTotalDeposited] = useState(0n);

  const { address } = useAccount();

  const getBalance = useCallback(async () => {
    if (!address) return;
    if (!isAddress(vault.address)) return;

    const amountDeposited = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vault.address,
      functionName: "deposited",
      chainId: sepolia.id,
      args: [address],
    });

    setTotalDeposited(amountDeposited);
  }, [address, vault.address]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

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
          <p>{formatUnits(totalDeposited, vault.assetTokenDecimals)}</p>
          {vault.assetTokenName}
        </div>
        <div className="flex-1">
          {new Date(vault.startsAt).toLocaleDateString("en-US")}
        </div>
        <Link
          className="flex items-center"
          href={`/token-vault/${vault.address}`}
        >
          <Button
            className="flex gap-2 py-2 px-4 right-2"
            intent={"primary"}
            size={"small"}
          >
            View now
            <FaArrowRightLong />
          </Button>
        </Link>
      </Card>
    </div>
  );
}
