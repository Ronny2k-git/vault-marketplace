import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getVaultInDb = async (vaultDate: any) => {
  try {
    const { vaultName, startDate, endDate } = vaultDate;

    const vault = await prisma.vault.findMany({});
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error in your operation ",
    });
  }
};
