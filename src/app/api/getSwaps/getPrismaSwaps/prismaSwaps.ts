import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getSwapsInDb = async (currentPage: number = 1) => {
  try {
    const limit = 10;
    const skip = limit * (currentPage - 1);

    const Swaps = await prisma.swap.findMany({
      select: {
        amount: true,
        sender: true,
        dateTime: true,
        type: true,
      },
      take: limit,
      skip: skip,
      orderBy: {
        dateTime: "desc",
      },
    });
    return NextResponse.json({ success: true, Swaps }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error getting in the database" },
      { status: 500 }
    );
  }
};
