"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";

import { VaultCardTransaction } from "@/components/vault/VaultCardTransaction";

import { Card } from "@/components/interface/Card";
import { TransactionCardRow } from "@/components/swap";
import { useGetSwaps } from "@/components/swap/hooks";
import { Pagination } from "@/global/components";
import { useGetTokenDecimals, useGetVaultDepositLimits } from "@/global/hooks";
import { useState } from "react";
import { Address, formatUnits } from "viem";

export function PageView({ vault }: { vault: VaultFromDb }) {
  // States
  const [currentPage, setCurrentPage] = useState(1);

  // Hooks
  const { data: tokenDecimals } = useGetTokenDecimals(
    vault.assetTokenAddress as Address
  );
  const { minDeposit, maxDeposit } = useGetVaultDepositLimits(
    vault.address as Address
  );

  const { data } = useGetSwaps({ page: currentPage, vaultId: vault.id });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Vault infos
  const formatStartDate = new Date(vault.startsAt).toLocaleDateString("en-US");
  const formatEndDate = new Date(vault.endsAt).toLocaleDateString("en-US");
  const swaps = data?.swaps ?? [];
  const total = data?.total ?? 0;
  const limit = data?.limit ?? 10;
  const totalPages = Math.max(1, Math.ceil(total / limit));

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
        <div
          id="vault-info"
          className="flex flex-wrap gap-8 text-sm max-lg:justify-center w-full"
        >
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
              className=" flex min-h-[23rem] flex-col min-w-[34rem] p-4 gap-1.5 rounded-b-xl text-sm bg-black/5 border-b border-x "
              intent={"tertiary"}
            >
              {swaps.length > 0 ? (
                swaps.map((swap, index) => (
                  <TransactionCardRow
                    key={index}
                    amount={swap.amount}
                    dateTime={swap.dateTime}
                    sender={swap.sender}
                    txHash={swap.txHash}
                    type={swap.type}
                    vault={vault}
                  />
                ))
              ) : (
                <div className="flex flex-col gap-4 h-full items-center justify-center text-white">
                  <p className="text-3xl text-blue-400 font-semibold">
                    No Swaps found
                  </p>

                  <span className="text-gray-300 text-base text-center max-w-sm">
                    There are no transactions for this vault yet. Once a deposit
                    or withdrawal is made, it will appear here.
                  </span>
                </div>
              )}
            </Card>
          </div>
          {/* Card used to deposit or withdraw in a vault */}
          <VaultCardTransaction className="lg:min-h-[23rem]" vault={vault} />/
        </div>

        {/* ================= PAGINATION ================= */}
        {data?.swaps && totalPages > 1 && (
          <div className="flex w-full justify-center max-w-[40rem] lg:max-w-[37rem] text-white">
            <Pagination
              onChange={handlePageChange}
              page={currentPage}
              totalPages={totalPages}
              scrollId="vault-info"
            />
          </div>
        )}
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
