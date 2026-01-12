import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import { FormValues } from "@/global/types";
import { vault } from "@prisma/client";
import { atom } from "jotai";

export const vaultAtom = atom({} as VaultFromDb);
export const vaultExplore = atom<vault[] | null>(null);
export const minDepositAtom = atom<bigint>(0n);
export const maxDepositAtom = atom<bigint>(0n);
export const amountTotalDeposited = atom(0n);
export const tokenDecimals = atom(0);
export const swapAtom = atom<any[]>([]);
export const getVaults = atom<vault[] | null>(null);

//Create Page

export const createVaultAtom = atom<Partial<FormValues>>({
  network: "",
  vaultName: "",
  vaultLogo: "",
  bannerUrl: "",
  assetToken: "" as `0x${string}`,
  salt: BigInt(0),
  minDeposit: BigInt(0),
  maxDeposit: BigInt(0),
  startDate: null,
  endDate: null,
});
