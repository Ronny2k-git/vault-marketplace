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

export const createVaultInDb = async (vault: createVaultInDbProps) => {
  try {
    const vaultData = await prisma.vault.create({
      data: {
        address: vault.address,
        name: vault.vaultName,
        logo: vault.vaultLogo,
        banner: vault.bannerUrl,
        startsAt: vault.startDate,
        endsAt: vault.endDate,
        chainId: vault.chainId,
        assetTokenDecimals: vault.assetTokenDecimals,
        assetTokenName: vault.assetTokenName,
        assetTokenSymbol: vault.assetTokenSymbol,
        assetTokenAddress: vault.assetTokenAddress,
      },
    });
    return vaultData;
  } catch (error) {
    console.error("Error saving vault to DB", error);
    throw new Error("Failed to save vault to database");
  }
};
