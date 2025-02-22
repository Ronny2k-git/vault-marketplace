import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getVaultInDb = async () => {
  const currentDate = new Date();

  try {
    const vaults = await prisma.vault.findMany({
      where: {
        startsAt: {
          lt: currentDate,
        },
        endsAt: {
          gt: currentDate,
        },
      },
      select: {
        id: true,
        address: true,
        name: true,
        banner: true,
        logo: true,
        startsAt: true,
        endsAt: true,
        assetTokenName: true,
        assetTokenDecimals: true,
      },
      orderBy: {
        startsAt: "desc",
      },
      take: 9,
    });

    const vaultsWithParticipants = await Promise.all(
      vaults.map(async (vault) => {
        const participantsCount = await prisma.swap.count({
          where: {
            vaultId: vault.id,
          },
        });

        return {
          ...vault,
          participants: participantsCount,
        };
      })
    );
    return vaultsWithParticipants;

    // return vaults;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching vault data",
    });
  }
};
