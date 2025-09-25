"use client";

import { getVaults, vaultExplore } from "@/utils/atom";
import { vault } from "@prisma/client";
import { useAtom } from "jotai";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./interface/button";
import { ErrorDatabase } from "./interface/errorDatabase";
import { CardLive } from "./vault/vaultCardLive";
import { CardTokens } from "./vault/vaultCardTokens";

export function TokenVaults() {
  const [vaultData, setVaultData] = useAtom<vault[] | null>(vaultExplore);
  const [endVaults, setEndVaults] = useAtom<vault[] | null>(getVaults);
  const [currentPage, setCurrentPage] = useState(1);

  const { tokenAddress } = useParams();

  async function fetchVaultData() {
    const response = await fetch("/api/getCardLive", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setVaultData(data.vaults);
    } else {
      console.error("Error getting in the database", data.message);
    }
  }

  async function fetchEndVaultsData(page: number = 1) {
    const response = await fetch(`/api/getEndVaults?page=${page}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setEndVaults(data.endVaults);
    } else {
      console.error("Error getting in the database", data.message);
    }
  }

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
    fetchEndVaultsData(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage((prev) => prev - 1);
    fetchEndVaultsData(currentPage - 1);
  };

  useEffect(() => {
    fetchEndVaultsData();
    fetchVaultData();
  }, [tokenAddress]);

  if (!Array.isArray(vaultData) || vaultData.length === 0)
    return <ErrorDatabase />;

  return (
    <div className="w-full max-w-screen-xl">
      <div className="flex flex-col w-full p-4 lg:p-8 font-SpaceGrotesk">
        <section className="flex justify-between max-sm:flex-col mt-4 mb-10">
          <div className="flex flex-col items-start">
            <h1 className="lg:text-3xl sm:text-2xl text-2xl pr-10 mr-6 text-white">
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
            {vaultData.map((vault) => (
              <CardLive key={vault.address} vault={vault} />
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-20 ">
          <div className="text-3xl  w-full text-white">
            Completed Token Vaults
          </div>
          <div className="text-base lg:ml-0 text-text-foreground mb-6">
            Take a glance on previous token vaults.
          </div>
          <div className="flex justify-center items-center">
            <div className=" w-full py-3 text-text-foreground hidden sm:flex">
              <div className="flex w-full ">
                <div className="flex-1">Vault Name</div>
                <div className="flex-1">Participants</div>
                <div className="flex-1">Total Deposited</div>
                <div className="flex-1">Start Date</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center ">
          {endVaults?.map((vault, index) => (
            <CardTokens key={index} vault={vault} />
          ))}
        </div>
        <div className="flex justify-center lg:mr-[70px] text-white mt-6 gap-1">
          <button
            className="h-5 w-5 text-xs bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg"
            onClick={previousPage}
          >
            {"<"}
          </button>
          <button className="h-5 w-5 text-xs bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg">
            {currentPage}
          </button>
          <button
            className="h-5 w-5 text-xs bg-gray-600 hover:bg-gray-700 justify-center items-center flex rounded-lg"
            onClick={nextPage}
          >
            {">"}
          </button>
        </div>
        <div className="mt-12">.</div>
      </div>
    </div>
  );
}
