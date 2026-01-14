import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSwapsInDb = async ({
  vaultId,
  currentPage = 1,
}: {
  vaultId: number;
  currentPage: number;
}) => {
  const limit = 10;
  const skip = limit * (currentPage - 1);
  const where = { vaultId };

  const [swaps, total] = await Promise.all([
    // Fetch swaps
    prisma.swap.findMany({
      where,
      select: {
        amount: true,
        sender: true,
        dateTime: true,
        type: true,
        txHash: true,
      },
      take: limit,
      skip,
      orderBy: {
        dateTime: "desc",
      },
    }),

    // Total swaps
    prisma.swap.count({ where }),
  ]);

  return { swaps, total, limit };
};
