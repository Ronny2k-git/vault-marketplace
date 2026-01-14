import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEndVaultsInDb = async (currentPage: number = 1) => {
  const limit = 10;
  const skip = limit * (currentPage - 1);
  const currentDate = new Date();

  const [vaults, total] = await Promise.all([
    prisma.vault.findMany({
      where: {
        endsAt: { lt: currentDate },
      },
      select: {
        id: true,
        name: true,
        startsAt: true,
        endsAt: true,
        assetTokenName: true,
        address: true,
        logo: true,
        assetTokenDecimals: true,
      },
      take: limit,
      skip,
      orderBy: { startsAt: "desc" },
    }),

    // Total vaults
    prisma.vault.count({
      where: {
        endsAt: { lt: currentDate },
      },
    }),
  ]);

  const vaultsWithParticipants = await Promise.all(
    vaults.map(async (vault) => {
      const participants = await prisma.swap.count({
        where: { vaultId: vault.id },
      });

      return { ...vault, participants };
    })
  );

  return {
    vaults: vaultsWithParticipants,
    total,
    limit,
  };
};
