/*
  Warnings:

  - Added the required column `assetTokenAddress` to the `Vault` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vault` ADD COLUMN `assetTokenAddress` VARCHAR(191) NOT NULL;
