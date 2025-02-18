import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getVaultInDb = async () => {
  try {
    const vaults = await prisma.vault.findMany({
      select: {
        id: true,
        address: true,
        name: true,
        banner: true,
        logo: true,
        startsAt: true,
        endsAt: true,
        assetTokenName: true,
      },
      orderBy: {
        startsAt: "desc",
      },
      take: 3,
    });
    return vaults;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetching vault data",
    });
  }
};
