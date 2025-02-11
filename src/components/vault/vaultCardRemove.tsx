"use client";

import { amountTotalDeposited, tokenDecimals, vaultAtom } from "@/utils/atom";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import { useAtom } from "jotai";
import { vault } from "@/app/token-vault/[tokenAddress]/page";
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
import { useAccount } from "wagmi";
import { erc20Abi, formatUnits, parseUnits } from "viem";

export function CardRemove() {
  const [vaultData] = useAtom<vault | null>(vaultAtom);
  const [totalDeposited, setTotalDeposited] = useAtom(amountTotalDeposited);
  const [decimals] = useAtom(tokenDecimals);
  const [removeAmount, setRemoveAmount] = useState("");
  const [message, setMessage] = useState("");

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
    const depositedValue = BigInt(amountDeposited);

    setTotalDeposited(depositedValue);
    return depositedValue;
  }

  async function approveToken(amount: bigint) {
    const spenderAddress = vaultData!.address;

    const tx = await writeContract(wagmiConfig, {
      abi: erc20Abi,
      address: vaultData!.assetTokenAddress,
      functionName: "approve",
      chainId: sepolia.id,
      args: [spenderAddress, amount],
    });
    return tx;
  }

  useEffect(() => {
    totalAmountDeposited();
  }, []);

  const { isConnected } = useAccount();

  async function onSubmit() {
    try {
      if (!vaultData) {
        return;
      }

      if (!isConnected) {
        setMessage("Please connect your wallet");
      }

      const parsedDepositAmount = parseUnits(removeAmount, decimals);
      const amountDeposited = await totalAmountDeposited();

      if (parsedDepositAmount === 0n) {
        setMessage("Please enter a value");
        return;
      }

      if (typeof amountDeposited === "bigint" && amountDeposited <= 0n) {
        setMessage("Insufficient balance");
        return;
      }

      if (typeof parsedDepositAmount > amountDeposited) {
        setMessage("Insufficient balance");
        return;
      }

      const approveTxHash = await approveToken(parsedDepositAmount);

      setMessage("Waiting for transaction");

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

      setMessage("Waiting for transaction");

      await waitForTransactionReceipt(wagmiConfig, {
        hash: removeTx,
      });

      console.log("Remove transaction sent:", removeTx);
      setMessage("Transaction successfull");
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
              Deposited:
              {formatUnits(totalDeposited, decimals) || "Loading ..."}
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
          {message || `Withdraw ${vaultData.assetTokenName}`}
        </Button>
      </div>
    </div>
  );
}
