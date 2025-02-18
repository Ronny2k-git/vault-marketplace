import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEndVaultsInDb = async () => {
  const endVaults = await prisma.vault.findMany({
    select: {
      name: true,
      startsAt: true,
      assetTokenName: true,
    },
  });
};
