import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTableSwapsInDb = async (swaps: any) => {
  try {
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
