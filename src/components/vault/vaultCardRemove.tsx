"use client";

import { amountTotalDeposited, vaultAtom } from "@/utils/atom";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import { useAtom } from "jotai";
import { Vault } from "@/app/token-vault/[tokenAddress]/page";
import { wagmiConfig } from "../provider";
import { abiVault } from "@/utils/abiVault";
import { sepolia } from "viem/chains";
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { useEffect, useState } from "react";
import { useAccount, WagmiConfig } from "wagmi";
import { erc20Abi, parseUnits } from "viem";

export function CardRemove() {
  const [vaultData] = useAtom<Vault | null>(vaultAtom);
  const [totalDeposited, setTotalDeposited] = useAtom(amountTotalDeposited);
  const [decimals, setDecimals] = useState<number>(0);
  const [removeAmount, setRemoveAmount] = useState("");

  if (!vaultData) {
    return "Loading vault data";
  }

  async function totalAmountDeposited() {
    if (!vaultData) {
      return "Loading vault data";
    }

    const amountDeposited = await readContract(wagmiConfig, {
      abi: abiVault,
      address: vaultData.address,
      functionName: "deposited",
      chainId: sepolia.id,
      args: ["0xD2dD0C955b5a0eDEAA05084778bF4f7a03D2AaDA"],
    });
    setTotalDeposited(amountDeposited.toString());
  }

  async function fetchDecimals() {
    if (!vaultData) {
      return "Loading vault data";
    }

    const tokenDecimals = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: vaultData.assetTokenAddress,
      functionName: "decimals",
      chainId: sepolia.id,
      args: [],
    });

    setDecimals(tokenDecimals);
  }

  async function approveToken(amount: bigint) {
    if (!vaultData) {
      return "Loading vault data";
    }

    const spenderAddress = vaultData.address;

    const tx = await writeContract(wagmiConfig, {
      abi: erc20Abi,
      address: vaultData.assetTokenAddress,
      functionName: "approve",
      chainId: sepolia.id,
      args: [spenderAddress, amount],
    });
    return tx;
  }

  useEffect(() => {
    fetchDecimals();
    totalAmountDeposited();
  }, []);

  const { isConnected } = useAccount();

  async function onSubmit() {
    try {
      if (!vaultData) {
        return;
      }

      if (!isConnected) {
        alert("Please connect your wallet");
      }

      const parsedDepositAmount = parseUnits(removeAmount, decimals);
      const approveTxHash = await approveToken(parsedDepositAmount);

      console.log("Waiting for transaction");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: approveTxHash,
      });

      const simulateTx = await simulateContract(wagmiConfig, {
        abi: abiVault,
        address: vaultData.address, //Address of contract
        functionName: "withdraw",
        chainId: sepolia.id,
        args: [parsedDepositAmount],
      });

      console.log("Result of simulation:", simulateTx);

      const removeTx = await writeContract(wagmiConfig, {
        abi: abiVault,
        address: vaultData.address, //Address of contract
        functionName: "withdraw",
        chainId: sepolia.id,
        args: [parsedDepositAmount],
      });

      console.log("Remove transaction sent:", removeTx);
      alert("Remove successfull");
    } catch (error) {
      console.error("Error in transaction:", error);
    }
  }

  return (
    <div>
      <h1 className="ml-4 mb-2.5 text-white text-xl">
        Withdraw {vaultData.assetTokenName}
      </h1>
      <h2 className="text-xs ml-4 mb-2.5">
        Deposit yours tokens into a {vaultData.name} for safety!
      </h2>
      <div className="flex justify-center">
        <Card intent={"tertiary"} size={"mediumSmall"}>
          <div className="flex justify-between">
            <h1 className="text-sm ml-2 pb-1 mt-1">Vault token</h1>
            <h2 className="text-xs mr-2 mt-2">
              Deposited: {totalDeposited || "Loading ..."}
            </h2>
          </div>
          <div className="flex">
            <Input
              className="text-xs text-text-foreground hover:bg-transparent border-transparent"
              intent={"primary"}
              size={"large"}
              placeholder="0"
              onChange={(event) => setRemoveAmount(event.target.value)}
            ></Input>
            <div className="text-xs mt-0.5 right-10 absolute text-white">
              {vaultData.assetTokenName}
            </div>
            <img
              className="size-5 absolute ml-0.5 right-4"
              src={vaultData.logo}
            />
          </div>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button
          className="mt-2.5 w-[270px]"
          intent={"secondary"}
          size={"mediumLarge"}
          onClick={onSubmit}
        >
          Withdraw {vaultData.assetTokenName}
        </Button>
      </div>
    </div>
  );
}
