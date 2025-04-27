"use client";

import { useHydrateAtoms } from "jotai/utils";
import { VaultFromDb } from "@/app/api/getTokenAddress/getPrisma.ts/prisma";
import { Card } from "@/components/interface/card";
import { TransactionTokens } from "@/components/vault/vaultCardTokens";
import { CardTransaction } from "@/components/vault/vaultCardTransaction";

import {
  maxDepositAtom,
  minDepositAtom,
  swapAtom,
  tokenDecimals,
  vaultAtom,
} from "@/utils/atom";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";

export function PageView({ vault }: { vault: VaultFromDb }) {
  useHydrateAtoms([[vaultAtom, vault]]);

  const [minDeposit] = useAtom(minDepositAtom);
  const [maxDeposit] = useAtom(maxDepositAtom);
  const [decimals] = useAtom(tokenDecimals);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSwaps] = useAtom(swapAtom);

  const { tokenAddress } = useParams();

  async function fetchSwapData(page: number = 1) {
    const response = await fetch(`/api/getSwaps?page=${page}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setSwaps(data.swaps);
    } else {
      console.error("Error getting in the database", data.message);
    }
  }

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    fetchSwapData(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    fetchSwapData(currentPage - 1);
  };

  useEffect(() => {
    if (tokenAddress) {
      fetchSwapData();
    }
  }, [tokenAddress]);

  const formatStartDate = new Date(vault.startsAt).toLocaleDateString("en-US");
  const formatEndDate = new Date(vault.endsAt).toLocaleDateString("en-US");

  return (
    <div>
      <div className="h-screen w-[calc(screen-1px)] bg-background font-SpaceGrotesk">
        <div className="h-full w-full flex flex-col pt-12 items-center">
          <Card className="relative" intent={"primary"} size={"large"}>
            <img
              className="size-full object-cover rounded-2xl"
              src={vault.banner}
            />
            <div className="flex absolute bottom-3">
              <img
                className="size-11 ml-4 mr-1 rounded-full"
                src={vault.logo}
              />
              <div className="flex flex-col">
                <div className="text-2xl font-bold">{vault.name}</div>
                <div className="-mt-1 text-base">Sepolia</div>
              </div>
            </div>
          </Card>
          <div className="mt-4 flex gap-5 mr-56 mb-4">
            <div>
              <div className="text-sm text-white">Start date</div>
              <div className="text-xs text-text-foreground">
                {formatStartDate}
              </div>
            </div>
            <div>
              <div className="text-sm text-white">End date</div>
              <div className="text-xs text-text-foreground">
                {formatEndDate}
              </div>
            </div>
            <div>
              <div className="text-sm text-white">Max.deposite per wallet.</div>
              <div className="text-xs text-text-foreground">
                {formatUnits(maxDeposit, decimals)} {vault.name}
              </div>
            </div>
            <div>
              <div className="text-sm text-white">Min.deposit per wallet.</div>
              <div className="text-xs text-text-foreground">
                {formatUnits(minDeposit, decimals)} {vault.name}
              </div>
            </div>
          </div>
          <div className="flex gap-2.5">
            <div className="flex flex-col">
              <Card
                className="rounded-t-xl text-xs flex"
                intent={"primary"}
                size={"mediumLong"}
              >
                <div className="w-20 ml-2">AMOUNT</div>
                <div className="w-28">ACCOUNT</div>
                <div className="w-32">TIME</div>
                <div className="w-[70px]">TYPE</div>
              </Card>
              <TransactionTokens />
            </div>
            <CardTransaction />
          </div>
          <div className="text-white flex gap-2 text-[10px] mr-72">
            <button
              onClick={previousPage}
              className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg"
            >
              {"<"}
            </button>
            <button className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg">
              {currentPage}
            </button>
            <button
              onClick={nextPage}
              className="h-5 w-5 bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
