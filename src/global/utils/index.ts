import { VaultFromDb } from "@/app/api/getTokenAddress/getPrisma.ts/prisma";

export const abreviateAddress = (address: string | null | undefined) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`.toLowerCase();
};

export const getStatus = (vaultData: VaultFromDb) => {
  const currentDate = new Date();
  const startDate = new Date(vaultData.startsAt);
  const endDate = new Date(vaultData.endsAt);

  if (!vaultData) {
    return "No Data";
  }

  if (startDate > currentDate) {
    return "Coming";
  }
  if (startDate < currentDate && currentDate < endDate) {
    return "Live";
  } else {
    return "Finished";
  }
};
