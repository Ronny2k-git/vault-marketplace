import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createTokenInDb = async () => {
  const token = await prisma.token.create({
    data: {
      network,
      name,
      symbol,
      banner,
      maxSupply,
      decimals,
    },
  });
};
