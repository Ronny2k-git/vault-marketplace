import { NextRequest, NextResponse } from "next/server";
import { createTableSwapsInDb } from "./prismaSwaps/swaps";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const swap = await req.json();

      const swapsTable = await createTableSwapsInDb(swap);

      return NextResponse.json(
        { success: true, swap: swapsTable },
        { status: 200 }
      );
    } catch (error) {
      NextResponse.json({ success: false }, { status: 500 });
    }
  } else {
    NextResponse.json({ success: false }, { status: 405 });
  }
}
