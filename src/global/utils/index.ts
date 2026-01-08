import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";

// Function to format 0x address
export const abreviateAddress = (address: string | null | undefined) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`.toLowerCase();
};

// Function that returns a status based on the provided date.
export const getStatus = (date: VaultFromDb) => {
  const currentDate = new Date();
  const startDate = new Date(date.startsAt);
  const endDate = new Date(date.endsAt);

  if (!date) {
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

export function scrollToContainer(id: string) {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    console.warn(`Id not found: "${id}"`);
  }
}
