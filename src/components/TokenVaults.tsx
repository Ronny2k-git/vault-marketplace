"use client";

import { Pagination } from "@/global/components/Pagination";
import { useGetCompletedVaults } from "@/global/hooks/useGetCompletedVaults";
import { useGetLiveVaults } from "@/global/hooks/useGetLiveVaults";
import { vault } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./interface/button";
import { ErrorDatabase } from "./interface/errorDatabase";
import { CardLive } from "./vault/vaultCardLive";
import { VaultCardRow } from "./vault/VaultCardRow";

export function TokenVaults() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: getLiveVaults } = useGetLiveVaults();
  const { data: getCompletedVaults } = useGetCompletedVaults(currentPage);

  if (!getLiveVaults && !getCompletedVaults) return <ErrorDatabase />;

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex flex-col w-full p-4 lg:p-8 font-SpaceGrotesk">
        <section className="flex justify-between max-sm:flex-col gap-4 mt-4 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="lg:text-3xl sm:text-2xl text-2xl mr-6 text-white">
              Token Vaults
            </h1>
            <h2 className="mr-6 mt-1 mb-1 lg:text-base lg:block justify-center items-center flex text-sm pl-1 text-text-foreground">
              Explore lives and upcoming vaults on Vault Marketplace
            </h2>
          </div>
          <Link href={`/create-vault-page`}>
            <Button
              className="hover:bg-purple-600 shadow-shadow mt-1"
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
        <div className="flex justify-center items-center">
          <div className="grid justify-center gap-2.5 w-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
            {getLiveVaults?.map((vault: vault) => (
              <CardLive key={vault.address} vault={vault} />
            ))}
          </div>
        </div>

        {/* Ended Vaults Section */}
        <div className="flex flex-col mt-20">
          <div id="completed-vaults" className="text-3xl  w-full text-white">
            Completed Token Vaults
          </div>
          <div className="text-base text-text-foreground mb-6">
            Take a glance on previous token vaults.
          </div>
          <div className="flex justify-center items-center">
            <div className=" w-full py-3 text-text-foreground hidden md:flex">
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
        <div className="flex flex-col gap-1 items-center overflow-y-auto">
          {getCompletedVaults?.vaults.map((vault: vault) => (
            <VaultCardRow key={vault.address} vault={vault} />
          ))}
        </div>

        <div className="flex justify-center text-white my-10">
          <Pagination
            onChange={setCurrentPage}
            page={currentPage}
            totalPages={Math.ceil(
              getCompletedVaults?.total / getCompletedVaults?.limit
            )}
            scrollId="completed-vaults"
          />
        </div>
      </div>
    </div>
  );
}
