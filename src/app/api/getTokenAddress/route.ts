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
//   const { searchParams } = new URL(req.url);
//   const address = searchParams.get("address");
//   console.log("Received address:", address);

//   if (!address) {
//     return NextResponse.json(
//       { success: false, message: "Address is required" },
//       { status: 400 }
//     );
//   }

//   try {
//     const vault = await getVaultInDb(address);
//     return NextResponse.json({ success: true, vault }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching vault", error);
//     return NextResponse.json(
//       { success: false, message: "Error fetching vault data" },
//       { status: 500 }
//     );
//   }
// }
