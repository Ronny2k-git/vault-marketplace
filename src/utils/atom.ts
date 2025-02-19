import { VaultFromDb } from "@/app/api/getTokenAddress/getPrisma.ts/prisma";
// import { vault } from "@/app/token-vault/[tokenAddress]/page";
import { Vault } from "@prisma/client";
// import { Vault } from "@/components/homePage";
import { atom } from "jotai";

// // Criando átomos para armazenar os valores dos inputs
// export const networkAtom = atom("Sepolia");
// export const vaultNameAtom = atom("");
// export const vaultLogoAtom = atom("");
// export const bannerUrlAtom = atom("");
// export const minDepositAtom = atom("");
// export const maxDepositAtom = atom("");
// export const startDateAtom = atom<Date | null>(null);
// export const endDateAtom = atom<Date | null>(null);
export const vaultAtom = atom({} as VaultFromDb);
export const vaultExplore = atom<Vault[] | null>(null);
export const minDepositAtom = atom<bigint>(0n);
export const maxDepositAtom = atom<bigint>(0n);
export const amountTotalDeposited = atom(0n);
export const tokenDecimals = atom(0);
export const swapAtom = atom<any[]>([]);
export const getVaults = atom<Vault[] | null>(null);
