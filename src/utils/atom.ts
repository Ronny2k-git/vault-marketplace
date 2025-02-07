import { Vault } from "@/components/homePage";
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
export const vaultAtom = atom(null);
export const vaultExplore = atom<Vault[] | null>(null);
