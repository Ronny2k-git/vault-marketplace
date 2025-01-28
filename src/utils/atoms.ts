// import { atom } from "jotai";

// // Criando átomos para armazenar os valores dos inputs
// export const networkAtom = atom("Sepolia");
// export const vaultNameAtom = atom("");
// export const vaultLogoAtom = atom("");
// export const bannerUrlAtom = atom("");
// export const minDepositAtom = atom("");
// export const maxDepositAtom = atom("");
// export const startDateAtom = atom<Date | null>(null);
// export const endDateAtom = atom<Date | null>(null);

const timestamp = Math.floor(new Date("2025-01-25T00:00:00Z").getTime() / 1000);

console.log("A data convertida é: ", timestamp);
