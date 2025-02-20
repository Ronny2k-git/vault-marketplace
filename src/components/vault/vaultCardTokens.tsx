"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import Link from "next/link";
import {
  amountTotalDeposited,
  getVaults,
  swapAtom,
  tokenDecimals,
} from "@/utils/atom";
import { useAtom } from "jotai";
import { formatUnits, Hex, isAddress } from "viem";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { Vault } from "@prisma/client";
import { readContract } from "wagmi/actions";
import { wagmiConfig } from "../provider";
import { abiVault } from "@/utils/abiVault";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

interface CardTokenProps {
  vault: Vault;
}
export function CardTokens({ vault }: CardTokenProps) {
  // const [totalDeposited] = useAtom(amountTotalDeposited);
  const [decimals] = useAtom(tokenDecimals);
  const [totalDeposited, setTotalDeposited] = useState(0n);

  const { address } = useAccount();

  async function getBalance() {
    if (!isAddress(vault.address)) {
      throw new Error("Address is invalid");
    }

    const amountDeposited = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vault.address,
      functionName: "deposited",
      chainId: sepolia.id,
      args: [address!],
    });

    return setTotalDeposited(amountDeposited);
  }

  useEffect(() => {
    getBalance();
  });

  return (
    <div>
      <Card className="flex items-center" intent={"primary"} size={"long"}>
        <img className="size-7 ml-2 mr-1 rounded-full" src={vault.logo} />
        <div className="w-[130px]">
          {vault.name}
          <br /> Sepolia
        </div>
        <div className="w-[100px]">5</div>
        <div className="w-36">
          {formatUnits(totalDeposited, 18)} {vault.assetTokenName}
        </div>
        <div className="w-56">
          {new Date(vault.startsAt).toLocaleDateString("en-US")}
        </div>
        <Link href={`/token-vault/${vault.address}`}>
          <Button intent={"primary"} size={"small"}>
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
  const [decimals] = useAtom(tokenDecimals);

  const dateRelative = (dateTime: string) => {
    const data = new Date(dateTime);
    return formatDistanceToNow(data, {
      addSuffix: true,
      locale: enUS,
    });
  };

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
              {formatUnits(swap.amount, decimals)}
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
