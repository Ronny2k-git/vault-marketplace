import { NextRequest, NextResponse } from "next/server";
import { getSwapsInDb } from "./getPrismaSwaps/prismaSwaps";

async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const getSwap = getSwapsInDb();

      return NextResponse.json({ success: true, getSwap }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error getting in the databse" },
        { status: 500 }
      );
    }
  }
}
