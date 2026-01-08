import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
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
export const selectedNetworkAtom = atom<string>("");
export const vaultNameAtom = atom<string>("");
export const vaultLogoAtom = atom<string>("");
export const bannerUrlAtom = atom<string>("");
export const minDepositAtomCreate = atom<bigint>(0n);
export const maxDepositAtomCreate = atom<bigint>(0n);
export const startDateAtom = atom<Date | null>(null);
export const endDateAtom = atom<Date | null>(null);
