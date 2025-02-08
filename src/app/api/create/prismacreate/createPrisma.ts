import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createVaultInDb = async (vaultDate: any) => {
  try {
    const {
      address,
      vaultName,
      vaultLogo,
      bannerUrl,
      startDate,
      endDate,
      chainId,
      assetTokenDecimals,
      assetTokenName,
      assetTokenSymbol,
      assetTokenAddress,
    } = vaultDate;

    const vault = await prisma.vault.create({
      data: {
        address,
        name: vaultName,
        logo: vaultLogo,
        banner: bannerUrl,
        startsAt: startDate,
        endsAt: endDate,
        chainId,
        assetTokenDecimals,
        assetTokenName,
        assetTokenSymbol,
      },
    });
    return vault;
  } catch (error) {
    console.error("Error saving vault to DB", error);
    throw new Error("Failed to save vault to database");
  }
};
