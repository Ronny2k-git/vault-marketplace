import { NextRequest, NextResponse } from "next/server";
import { getSwapsInDb } from "./getPrismaSwaps/prismaSwaps";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page")) || 1;

    try {
      const swaps = await getSwapsInDb(page);
      return swaps;
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error getting in the databse", error },
        { status: 500 }
      );
    }
  }
}
