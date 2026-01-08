import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type Swaps = {
  id: number;
  amount: string;
  type: string;
  txHash: string;
  sender: string;
  dateTime: Date;
  vaultId: number;
};

export const createSwapsInDb = async (swaps: Swaps) => {
  try {
    console.log("swap data:", swaps);

    const { amount, type, txHash, sender, vaultId } = swaps;

    const tableSwap = await prisma.swap.create({
      data: {
        amount,
        type,
        txHash,
        sender,
        vaultId,
      },
    });
    return tableSwap;
  } catch (error) {
    console.error("Error in prisma create:", error);
  }
};
