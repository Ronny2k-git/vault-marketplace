import { VaultFromDb } from "@/app/api/getTokenAddress/getPrisma.ts/prisma";
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
