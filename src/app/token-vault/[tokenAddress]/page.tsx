"use client";

import { Card } from "@/components/interface/card";
import { TransactionTokens } from "@/components/vault/vaultCardTokens";
import { CardTransaction } from "@/components/vault/vaultCardTransaction";
import { vaultAtom } from "@/utils/atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Hex } from "viem";

export type Vault = {
  id: number;
  address: Hex;
  name: string;
  startsAt: string;
  endsAt: string;
  banner: string;
  logo: string;
  assetTokenName: string;
};

const cardTokensArray = new Array(10).fill(null);

export default function TokenAddress() {
  const [vaultData, setVaultData] = useAtom<Vault | null>(vaultAtom);

  // async function getContract() {
  //   const name = readContract(wagmiConfig, {
  //     abi: abi,
  //     address: "0xc15bE636cB7263551a5b25d542adAE123f909f8b",
  //     functionName: "",
  //   });
  // }

  async function fetchVaultData() {
    const response = await fetch("/api/getTokenAddress", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setVaultData(data.vault[0]);
    }

    console.log(data);
  }

  useEffect(() => {
    fetchVaultData();
  }, []);

  if (!vaultData) {
    return <div className="text-red-500">Loading...</div>;
  }

  const formatStartDate = new Date(vaultData.startsAt).toLocaleDateString(
    "en-US"
  );
  const formatEndDate = new Date(vaultData.endsAt).toLocaleDateString("en-US");

  return (
    <div className="h-screen w-[calc(screen-1px)] bg-background font-SpaceGrotesk">
      <div className="h-full w-full flex flex-col pt-12 items-center">
        <Card className="relative" intent={"primary"} size={"large"}>
          <img
            className="size-full object-cover rounded-2xl"
            src={vaultData.banner}
          />
          <div className="flex absolute bottom-3">
            <img className="size-11 ml-4 mr-1" src={vaultData.logo} />
            <div className="flex flex-col">
              <div className="text-2xl font-bold">{vaultData.name}</div>
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
            <div className="text-xs text-text-foreground">{formatEndDate}</div>
          </div>
          <div>
            <div className="text-sm text-white">Max.deposite per wallet.</div>
            <div className="text-xs text-text-foreground">
              5,400.50 {vaultData.name}
            </div>
          </div>
          <div>
            <div className="text-sm text-white">Min.deposit per wallet.</div>
            <div className="text-xs text-text-foreground">
              500 {vaultData.name}
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
              <div className="w-20">TIME</div>
              <div className="w-28">TYPE</div>
            </Card>
            {cardTokensArray.map((_, index) => (
              <TransactionTokens key={index} />
            ))}
          </div>
          <CardTransaction />
        </div>
        <div className="text-white text-[13px] mr-72 mt-2">
          {"<"} 1 2 3 ... 20 {">"}
        </div>
      </div>
    </div>
  );
}
