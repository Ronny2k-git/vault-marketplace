import { NextRequest, NextResponse } from "next/server";
import { getSwapsInDb } from "../../db/swap/getSwaps";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const vaultId = Number(searchParams.get("vaultId")) || 1;

    if (!vaultId) {
      return NextResponse.json(
        { success: false, message: "vaultId is required" },
        { status: 400 }
      );
    }

    const { swaps, total, limit } = await getSwapsInDb({
      currentPage: page,
      vaultId,
    });

    return NextResponse.json(
      { success: true, swaps, total, limit },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error getting in the databse", error },
      { status: 500 }
    );
  }
}
