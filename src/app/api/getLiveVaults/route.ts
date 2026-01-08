import { NextRequest, NextResponse } from "next/server";
import { getLiveVaultsInDb } from "../../db/vault/getLiveVaults";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const vaults = await getLiveVaultsInDb();

      return NextResponse.json({ success: true, vaults }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error fetching vault data", error },
        { status: 500 }
      );
    }
  }
}
