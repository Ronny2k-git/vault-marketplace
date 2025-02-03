import { NextRequest, NextResponse } from "next/server";
import { getVaultInDb } from "./getPrisma/getPrisma";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const vaultDate = await req.json();

      //   const getedVault = await getVaultInDb(vaultDate);

      //   return NextResponse.json({ success: true, vault: getedVault }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  }
}
