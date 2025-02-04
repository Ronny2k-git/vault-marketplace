import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getVaultInDb = async () => {
  try {
    const vaults = await prisma.vault.findMany({
      select: {
        name: true,
        startsAt: true,
        endsAt: true,
      },
    });
    return vaults;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error fetchinf vault data",
    });
  }
};
