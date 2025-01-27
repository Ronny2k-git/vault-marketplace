/*
  Warnings:

  - Added the required column `assetTokenDecimals` to the `Vault` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetTokenName` to the `Vault` table without a default value. This is not possible if the table is not empty.
  - Added the required column `assetTokenSymbol` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vault` 
    ADD COLUMN `assetTokenDecimals` INTEGER NOT NULL,
    ADD COLUMN `assetTokenName` VARCHAR(191) NOT NULL,
    ADD COLUMN `assetTokenSymbol` VARCHAR(191) NOT NULL;
