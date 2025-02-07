"use client";

import { erc20Abi, Hex, parseUnits } from "viem";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import { writeContract } from "wagmi/actions";
import { wagmiConfig } from "../provider";
import { sepolia } from "viem/chains";
import { vaultAtom } from "@/utils/atom";
import { useAtom } from "jotai";
import { Vault } from "@/app/token-vault/[tokenAddress]/page";

export function CardDeposit() {
  const [vaultData] = useAtom<Vault | null>(vaultAtom);

  const handleApproveToken = async () => {
    async function approveToken(spenderAddress: Hex, amount: bigint) {
      const tx = await writeContract(wagmiConfig, {
        abi: erc20Abi,
        address: "0xfAb19e8992B0564ab99F7c0098979595124f0Bc3", //Token tUSDT
        functionName: "approve",
        chainId: sepolia.id,
        args: [spenderAddress, amount],
      });
      return tx;
    }

    try {
      // const parsedAmount = parseUnits(test.toString(), 18);
    } catch (error) {
      console.log("Error in transaction");
    }
  };

  async function deposit() {
    try {
    } catch {
      console.log("Error in transaction");
    }
  }

  if (!vaultData) {
    return <p className="text-red-500">Loading vault data ...</p>;
  }

  return (
    <div>
      <h1 className="ml-4 mb-2.5 text-white text-xl">
        Deposit {vaultData.assetTokenName}
      </h1>
      <h2 className="text-xs ml-4 mb-2.5">
        Deposit yours tokens into a {vaultData.name} for safety!
      </h2>
      <div className="flex justify-center">
        <Card intent={"tertiary"} size={"mediumSmall"}>
          <div className="flex justify-between">
            <h1 className="text-sm ml-2 pb-1 mt-1">Vault token</h1>
            <h2 className="text-xs mr-2 mt-2">Balance: 10,298.23</h2>
          </div>
          <div className="flex">
            <Input
              className="text-xs text-text-foreground hover:bg-transparent border-transparent"
              intent={"primary"}
              size={"large"}
              placeholder="0"
            ></Input>
            <div className="text-xs mt-0.5 text-white">
              {vaultData.assetTokenName}
            </div>
            <img className="size-5 ml-0.5" src="/icons/usdcLogo.png" />
          </div>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button
          className="mt-2.5 w-[270px]"
          intent={"secondary"}
          size={"mediumLarge"}
        >
          Deposit {vaultData.assetTokenName}
        </Button>
      </div>
    </div>
  );
}
