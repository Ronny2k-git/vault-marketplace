"use client";

import { Button } from "@/components/interface/button";
import { ErrorDatabase } from "@/components/interface/errorDatabase";
import { CardLive } from "@/components/vault/VaultCardLive";
import { VaultCardRow } from "@/components/vault/VaultCardRow";
import { Pagination } from "@/global/components/Pagination";
import { useGetCompletedVaults } from "@/global/hooks/useGetCompletedVaults";
import { useGetLiveVaults } from "@/global/hooks/useGetLiveVaults";
import { vault } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";

export default function TokenVaults() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: getLiveVaults } = useGetLiveVaults();
  const { data: getCompletedVaults } = useGetCompletedVaults(currentPage);

  const totalPages = getCompletedVaults
    ? Math.ceil(getCompletedVaults.total / getCompletedVaults.limit)
    : 1;

  if (!getLiveVaults && !getCompletedVaults) return <ErrorDatabase />;

  return (
    <main className="bg-background min-h-screen w-full flex items-center justify-center ">
      <div className="w-full max-w-screen-xl">
        <div className="flex flex-col w-full p-4 lg:p-8 font-SpaceGrotesk">
          {/* Live Vaults Section */}
          <section className="flex justify-between max-sm:flex-col gap-4 mt-4 mb-10">
            <div className="flex flex-col items-start">
              <h2 className="text-2xl sm:text-3xl text-white">Token Vaults</h2>

              <span className=" text-base lg:block justify-center items-center flex pl-1 text-text-foreground">
                Explore lives and upcoming vaults on Vault Marketplace
              </span>
            </div>
            <Link href={`/create-vault-page`}>
              <Button
                className="hover:bg-purple-600 shadow-shadow"
                intent={"secondary"}
                size={"medium"}
              >
                <div className="size-3 text-accent flex justify-center items-center bg-white rounded-full">
                  +
                </div>
                Create a token vault
              </Button>
            </Link>
          </section>

          {/* Live Vaults */}
          <div className="flex justify-center items-center">
            <div className="grid justify-center gap-4 w-full grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {getLiveVaults?.map((vault: vault) => (
                <CardLive key={vault.address} vault={vault} />
              ))}
            </div>
          </div>

          {/* Completed Vaults Section */}
          <div className="flex flex-col mt-28">
            <h2
              id="completed-vaults"
              className="text-2xl sm:text-3xl w-full text-white"
            >
              Completed Token Vaults
            </h2>

            <span className="text-base text-text-foreground mb-6">
              Take a glance on previous token vaults.
            </span>
            <div className="flex justify-center items-center">
              <div className=" flex w-full py-3 text-text-foreground max-[840px]:hidden">
                <div className="flex-1 flex">
                  <div className="flex-1">Vault Name</div>
                  <div className="flex-1">Participants</div>
                  <div className="flex-1">Total Deposited</div>
                  <div className="flex-1">Start Date</div>
                  <div className="mr-8">Link</div>
                </div>
              </div>
            </div>
          </div>

          {/* Completed Vaults */}
          <div className="flex flex-col gap-1 items-center overflow-y-auto">
            {getCompletedVaults?.vaults.map((vault: vault) => (
              <VaultCardRow key={vault.address} vault={vault} />
            ))}
          </div>

          <div className="flex justify-center text-white my-10">
            <Pagination
              onChange={setCurrentPage}
              page={currentPage}
              totalPages={totalPages}
              scrollId="completed-vaults"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
