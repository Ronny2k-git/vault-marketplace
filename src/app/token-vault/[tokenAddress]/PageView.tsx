"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";

import { VaultCardTransaction } from "@/components/vault/VaultCardTransaction";
import { useHydrateAtoms } from "jotai/utils";

import { Card } from "@/components/interface/Card";
import { Swap, TransactionCardRow } from "@/components/swap/TransactionCardRow";
import { Pagination } from "@/global/components";
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
  const [swaps] = useAtom<Swap[]>(swapAtom);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (tokenAddress) {
      fetchSwapData(currentPage);
    }
  }, [tokenAddress, currentPage]);

  const formatStartDate = new Date(vault.startsAt).toLocaleDateString("en-US");
  const formatEndDate = new Date(vault.endsAt).toLocaleDateString("en-US");

  return (
    <div className="min-h-screen bg-background font-SpaceGrotesk flex justify-center py-12">
      <div className="w-full max-w-5xl flex flex-col items-start gap-6">
        {/* ================= BANNER CARD ================= */}
        <Card className="relative w-full" intent="primary" size="large">
          <img
            alt="banner"
            className="w-full h-full object-cover rounded-2xl"
            src={vault.banner}
          />

          <div className="absolute bottom-3 left-4 flex items-center gap-3 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-xl">
            <img alt="logo" className="size-11 rounded-full" src={vault.logo} />
            <div>
              <div className="text-2xl font-bold text-white">{vault.name}</div>
              <div className="text-sm text-text-foreground">Sepolia</div>
            </div>
          </div>
        </Card>

        {/* ================= VAULT INFO ================= */}
        <div className="flex gap-8 text-sm">
          <Info label="Start date" value={formatStartDate} />
          <Info label="End date" value={formatEndDate} />
          <Info
            label="Max deposit per wallet"
            value={`${formatUnits(maxDeposit, decimals)} ${vault.name}`}
          />
          <Info
            label="Min deposit per wallet"
            value={`${formatUnits(minDeposit, decimals)} ${vault.name}`}
          />
        </div>

        {/* ================= TRANSACTIONS ================= */}
        <div className="flex gap-4 w-full justify-center">
          <div className="flex flex-col">
            <Card
              className="rounded-t-xl text-xs flex"
              intent="primary"
              size="mediumLong"
            >
              <div className="w-20 ml-2">AMOUNT</div>
              <div className="w-28">ACCOUNT</div>
              <div className="w-32">TIME</div>
              <div className="w-16">TYPE</div>
            </Card>

            {swaps.map((swap, index) => (
              <TransactionCardRow
                key={index}
                amount={swap.amount}
                dateTime={swap.dateTime}
                sender={swap.sender}
                txHash={swap.txHash}
                type={swap.type}
              />
            ))}
          </div>
          <VaultCardTransaction />/
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex w-full justify-center text-white">
          <Pagination
            onChange={handlePageChange}
            page={currentPage}
            totalPages={5}
            scrollId="test"
          />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-white">{label}</div>
      <div className="text-xs text-text-foreground">{value}</div>
    </div>
  );
}
