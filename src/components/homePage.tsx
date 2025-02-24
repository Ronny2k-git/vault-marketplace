"use client";

import Link from "next/link";
import { Button } from "./interface/button";
import { Card } from "./interface/card";
import { CardLive } from "./vault/vaultCardLive";
import { CardTokens } from "./vault/vaultCardTokens";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { getVaults, vaultExplore } from "@/utils/atom";
import { useParams } from "next/navigation";
import { Vault } from "@prisma/client";

export function TokenVaults() {
  const [vaultData, setVaultData] = useAtom<Vault[] | null>(vaultExplore);
  const [endVaults, setEndVaults] = useAtom<Vault[] | null>(getVaults);
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
    console.log("API response:", data);

    if (data.success) {
      setEndVaults(data.endVaults);
      console.log("Updated endVaults:", data.endVaults);
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

  if (!vaultData) {
    return (
      <p
        className="h-screen w-screen flex text-red-500 text-x1 justify-center items-center
       bg-background"
      >
        Loading vault data ...
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-col font-SpaceGrotesk">
        <div className="flex pt-11 justify-center items-center">
          <h1 className="lg:w-[530px] w-[205px] lg:text-3xl sm:text-2xl text-2xl pr-10 mr-6 text-white">
            Token Vaults
          </h1>
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
        </div>
        <h2 className="mr-6 mt-1 lg:text-base lg:block justify-center items-center flex text-sm pl-1 pb-10 text-text-foreground">
          Explore lives and upcoming vaults on Vault Marketplace
        </h2>
        <div className="flex justify-center items-center">
          <div className="grid gap-2.5 lg:grid lg:w-full lg:grid-cols-3 grid-cols-1 lg:gap-2.5 mb-20">
            {vaultData.map((vault) => (
              <CardLive key={vault.address} vault={vault} />
            ))}
          </div>
        </div>

        <div className="flex flex-col ">
          <div className="text-3xl ml-32 lg:ml-0 w-[530px] text-white">
            Completed Token Vaults
          </div>
          <div className="text-base ml-32 lg:ml-0 text-text-foreground mb-6">
            Take a glance on previous token vaults.
          </div>
          <div className="flex justify-center items-center lg:block">
            <Card
              className=" py-3 px-3 gap-2.5 hidden lg:flex lg:rounded-t-xl"
              intent={"primary"}
              size={"long"}
            >
              <div className="w-24 flex ml-7">VAULT NAME</div>
              <div className="w-28">PARTICIPANTS</div>
              <div className="w-32">TOTAL DEPOSITED</div>
              <div className="w-32">START DATE</div>
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 items-center lg:block">
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
