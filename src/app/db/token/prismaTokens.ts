import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTokenInDb = async (token: Prisma.tokenCreateInput) => {
  try {
    console.log("token data:", token);

    const { network, name, symbol, banner, maxSupply, decimals } = token;

    const createToken = await prisma.token.create({
      data: {
        network,
        name,
        symbol,
        banner,
        maxSupply: BigInt(maxSupply),
        decimals,
      },
    });
    return createToken;
  } catch (error) {
    console.error("Error token prisma create:", error);
  }
};
