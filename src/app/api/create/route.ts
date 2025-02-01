import { createVaultInDb } from "../prismacreate/createPrisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const vaultDate = req.body;

      const createdVault = await createVaultInDb(vaultDate);

      return NextResponse.json(
        { success: true, vault: createdVault },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
