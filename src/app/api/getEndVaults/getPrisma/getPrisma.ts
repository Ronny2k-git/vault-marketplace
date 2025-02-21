import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEndVaultsInDb = async (currentPage: number = 1) => {
  try {
    const limit = 10;
    const skip = limit * (currentPage - 1);
    const currentDate = new Date();

    const endVaults = await prisma.vault.findMany({
      where: {
        endsAt: {
          lt: currentDate,
        },
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
      skip: skip,
      orderBy: {
        startsAt: "desc",
      },
    });

    const vaultsWithParticipants = await Promise.all(
      endVaults.map(async (vault) => {
        const swapCount = await prisma.swap.count({
          where: {
            vaultId: vault.id,
          },
        });
        return {
          ...vault,
          participants: swapCount,
        };
      })
    );

    return vaultsWithParticipants;

    // return endVaults;
  } catch (error) {
    console.error("Error while fetching the completed vaults", error);
  }
};
