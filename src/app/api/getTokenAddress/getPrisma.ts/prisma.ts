import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getVaultInDb = async () => {
  try {
    const vault = await prisma.vault.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        logo: true,
        banner: true,
        startsAt: true,
        endsAt: true,
      },
    });
    return vault;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching vault data" },
      { status: 500 }
    );
  }
};
