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

// import { PrismaClient } from "@prisma/client";
// import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

// export const getVaultInDb = async (address: string) => {
//   try {
//     const vault = await prisma.vault.findUnique({
//       where: {
//         address: address, // Busca o vault pelo endereço
//       },
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

//     // Verifica se o vault foi encontrado
//     if (!vault) {
//       throw new Error("Vault not found");
//     }

//     return vault;
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: error || "Error fetching vault data" },
//       { status: 500 }
//     );
//   }
// };
