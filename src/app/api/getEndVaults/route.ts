import { NextRequest, NextResponse } from "next/server";
import { getEndVaultsInDb } from "../../db/vault/getEndVaults";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || 1);

    try {
      const endVaults = await getEndVaultsInDb(page);
      return NextResponse.json({ success: true, endVaults }, { status: 200 });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Error fetching completed vaults from the database",
        error,
      });
    }
  }
}
