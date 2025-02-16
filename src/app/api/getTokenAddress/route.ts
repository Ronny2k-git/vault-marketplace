import { NextRequest, NextResponse } from "next/server";
import { getVaultInDb } from "./getPrisma.ts/prisma";

export async function GET(req: NextRequest) {
  if (req.method === "GET") {
    try {
      const vault = await getVaultInDb();

      return NextResponse.json({ success: true, vault }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error fetching vault data" },
        { status: 500 }
      );
    }
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { getVaultInDb } from "./getPrisma.ts/prisma";

// export async function GET(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const address = searchParams.get("address");

//     if (!address) {
//       return NextResponse.json(
//         { success: false, message: "Address parameter is required" },
//         { status: 400 }
//       );
//     }
//     const vault = await getVaultInDb(address);

//     return NextResponse.json({ success: true, vault }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error || "Error fetching vault data" },
//       { status: 500 }
//     );
//   }
// }
