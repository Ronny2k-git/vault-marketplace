"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";

import { VaultCardTransaction } from "@/components/vault/VaultCardTransaction";

import { Card } from "@/components/interface/Card";
import { Swap, TransactionCardRow } from "@/components/swap/TransactionCardRow";
import { Pagination } from "@/global/components";
import { useGetTokenDecimals, useGetVaultDepositLimits } from "@/global/hooks";
import { swapAtom } from "@/utils/atom";
import { useAtom } from "jotai";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Address, formatUnits } from "viem";

export function PageView({ vault }: { vault: VaultFromDb }) {
  // Atoms
  const [swaps] = useAtom<Swap[]>(swapAtom);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSwaps] = useAtom(swapAtom);

  // Hooks
  const { data: tokenDecimals } = useGetTokenDecimals(
    vault.assetTokenAddress as Address
  );
  const { minDeposit, maxDeposit } = useGetVaultDepositLimits(
    vault.address as Address
  );

  const { tokenAddress } = useParams();

  const fetchSwapData = useCallback(
    async (page: number = 1) => {
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
    },
    [setSwaps]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (tokenAddress) {
      fetchSwapData(currentPage);
    }
  }, [tokenAddress, currentPage, fetchSwapData]);

  // Formatted vault dates
  const formatStartDate = new Date(vault.startsAt).toLocaleDateString("en-US");
  const formatEndDate = new Date(vault.endsAt).toLocaleDateString("en-US");

  // REFACTOR LATER:

  // 1 VAULT CARD DEPOSIT - DEPOSIT FUNCTIONALITY
  // 2 VAULT CARD REMOVE  - WITHDRAW FUNCTIONALITY
  // 3 INTERFACE COMPONENTS
  // 4 TYPE THE FUNCTIONS THAT ARE FROM TYPE ANY (atom.ts file)
  // 5 TEST ALL THE SITE FEATURES ("The responsibility is working well")

  return (
    <div className="min-h-screen p-4 bg-background font-SpaceGrotesk flex justify-center py-12">
      <div className="w-full max-w-2xl lg:max-w-5xl flex flex-col items-start gap-6">
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
        <div className="flex flex-wrap gap-8 text-sm max-lg:justify-center w-full">
          <Info
            label="Min deposit per wallet"
            value={`${formatUnits(minDeposit, tokenDecimals ?? 0)} ${
              vault.name
            }`}
          />
          <Info
            label="Max deposit per wallet"
            value={`${formatUnits(maxDeposit, tokenDecimals ?? 0)} ${
              vault.name
            }`}
          />
          <Info label="Start date" value={formatStartDate} />
          <Info label="End date" value={formatEndDate} />
        </div>

        {/* ================= TRANSACTIONS ================= */}
        <div className="flex max-lg:flex-col-reverse lg:gap-2 w-full justify-center max-lg:items-center ">
          <div className="flex w-full flex-col overflow-x-auto">
            <div className="flex flex-col gap-4 max-lg:mt-12">
              <p className="lg:hidden text-white text-2xl font-semibold">
                Your Transactions
              </p>

              <Card
                className=" rounded-t-xl px-4 text-sm  flex min-w-[34rem]"
                intent="primary"
                size="mediumLong"
              >
                <div className="flex-1">AMOUNT</div>
                <div className="flex-1">ACCOUNT</div>
                <div className="flex-1">TIME</div>
                <div className="w-16">TYPE</div>
              </Card>
            </div>
            <Card
              className=" flex flex-col min-w-[34rem] overflow-y-ato p-4 gap-1.5 rounded-b-xl text-sm bg-black/5 border-b border-x "
              intent={"tertiary"}
            >
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
            </Card>
          </div>
          {/* Card used to deposit or withdraw in a vault */}
          <VaultCardTransaction vault={vault} />/
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex w-full justify-center max-w-[40rem] lg:max-w-[37rem] text-white">
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
    <div className="flex flex-col flex-wrap">
      <div className="text-white text-base">{label}</div>
      <div className="text-base text-text-foreground">{value}</div>
    </div>
  );
}
