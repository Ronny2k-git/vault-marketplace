"use client";

import { abiVault } from "@/utils";
import { vault } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { useAtom } from "jotai";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { formatUnits, Hex, isAddress } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";
import { swapAtom, vaultAtom } from "../../utils/atom";
import { Button } from "../interface/button";
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
          <br /> {vault.chainId === 11155111 ? "Sepolia" : "Unknown Chain"}
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

export type Swap = {
  amount: bigint;
  sender: Hex;
  dateTime: string;
  type: string;
  txHash: Hex;
};

export function TransactionTokens() {
  const [swaps] = useAtom<Swap[]>(swapAtom);
  const [vault] = useAtom(vaultAtom);

  const dateRelative = (dateTime: string) => {
    const data = new Date(dateTime);
    return formatDistanceToNow(data, {
      addSuffix: true,
      locale: enUS,
    });
  };

  const decimals = vault.assetTokenDecimals;
  console.log(decimals);

  if (!swaps || swaps.length === 0) {
    return <div>No swaps found</div>;
  }

  return (
    <div>
      {swaps.map((swap, index) => (
        <Link
          key={index}
          href={`https://sepolia.etherscan.io/tx/${swap.txHash}`}
        >
          <Card
            className="flex gap-2 text-white text-[12px] hover:bg-gray-600"
            intent={"primary"}
            size={"mediumLong"}
            title="Click to be redirected to the transaction on the blockchain"
            key={index}
          >
            <div className="w-20 ml-2 text-[11px]">
              {formatUnits(swap.amount, vault.assetTokenDecimals)}
            </div>
            <div className="w-28 text-[10.5px]">{`${swap.sender.slice(
              0,
              6
            )}...${swap.sender.slice(-4).toLocaleLowerCase()}`}</div>
            <div className="w-32 text-[11px]">
              {dateRelative(swap.dateTime)}
            </div>
            <div
              className={`${
                swap.type === "deposit"
                  ? "text-live-accent text-[11px]"
                  : "text-red-600 font-semibold text-[11px]"
              }`}
            >
              {swap.type}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
