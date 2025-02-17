// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const getVaultInDb = async () => {
  try {
    const vault = await prisma.vault.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        logo: true,
        banner: true,
        startsAt: true,
        endsAt: true,
        assetTokenName: true,
        assetTokenAddress: true,
      },
    });
    return vault;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching vault data" },
      { status: 500 }
    );
  }
};

// const prisma = new PrismaClient();

// export const getVaultInDb = async (address: string) => {
//   try {
//     const vault = await prisma.vault.findUnique({
//       where: address, // assuming 'address' is unique
//       select: {
//         id: true,
//         name: true,
//         address: true,
//         logo: true,
//         banner: true,
//         startsAt: true,
//         endsAt: true,
//         assetTokenName: true,
//         assetTokenAddress: true,
//       },
//     });

//     if (!vault) {
//       throw new Error("Vault not found");
//     }

//     return vault;
//   } catch (error) {
//     console.error("Error fetching vault", error);
//     return NextResponse.json(
//       { success: false, message: "Error fetching vault data" },
//       { status: 500 }
//     );
//   }
// };
