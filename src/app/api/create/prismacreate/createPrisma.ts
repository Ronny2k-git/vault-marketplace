import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type createVaultInDbProps = {
  address: string;
  vaultName: string;
  vaultLogo: string;
  bannerUrl: string;
  startDate: Date;
  endDate: Date;
  chainId: number;
  assetTokenDecimals: number;
  assetTokenName: string;
  assetTokenSymbol: string;
  assetTokenAddress: string;
};

export const createVaultInDb = async (vaultDate: createVaultInDbProps) => {
  try {
    const vault = await prisma.vault.create({
      data: {
        address: vaultDate.address,
        name: vaultDate.vaultName,
        logo: vaultDate.vaultLogo,
        banner: vaultDate.bannerUrl,
        startsAt: vaultDate.startDate,
        endsAt: endDate,
        chainId: vaultDate.chainId,
        assetTokenDecimals: vaultDate.assetTokenDecimals,
        assetTokenName: vaultDate.assetTokenName,
        assetTokenSymbol: vaultDate.assetTokenSymbol,
        assetTokenAddress: vaultDate.assetTokenAddress,
      },
    });
    return vault;
  } catch (error) {
    console.error("Error saving vault to DB", error);
    throw new Error("Failed to save vault to database");
  }
};
