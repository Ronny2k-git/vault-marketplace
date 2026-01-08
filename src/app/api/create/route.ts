import { NextRequest, NextResponse } from "next/server";
import { createVaultInDb } from "../../db/vault/createVaults";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const vaultDate = await req.json(); //Na versao antiga do Next accesava diretamente com req.body

      const createdVault = await createVaultInDb(vaultDate);

      return NextResponse.json(
        { success: true, vault: createdVault },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error creating vault", error },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}
