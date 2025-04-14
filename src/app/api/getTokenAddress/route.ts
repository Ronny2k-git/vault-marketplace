import { NextRequest, NextResponse } from "next/server";
import { getVaultInDb } from "./getPrisma.ts/prisma";
import { isAddress } from "viem";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const address = req.nextUrl.searchParams.get("address");
      console.log(typeof address);

      if (!address) {
        return NextResponse.json(
          { success: false, message: "Address is required" },
          { status: 400 }
        );
      }

      if (!isAddress(address)) {
        return NextResponse.json(
          { success: false, message: "Address is invalid" },
          { status: 400 }
        );
      }

      const vault = await getVaultInDb(address);

      return NextResponse.json({ success: true, vault }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error fetching vault data", error },
        { status: 500 }
      );
    }
  }
}
