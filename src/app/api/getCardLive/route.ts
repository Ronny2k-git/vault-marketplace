import { NextRequest, NextResponse } from "next/server";
import { getVaultInDb } from "./getPrisma/getPrisma";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const vaults = await getVaultInDb();

      return NextResponse.json({ success: true, vaults }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error fetching vault data", error },
        { status: 500 }
      );
    }
  }
}
