/*
  Warnings:

  - You are about to alter the column `percents` on the `AdvertisingForRub` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `percentageForDelivery` on the `Gabarit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `warehouseStorage` on the `Gabarit` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `percents` on the `TaxForRub` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "AdvertisingForRub" ALTER COLUMN "percents" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Gabarit" ALTER COLUMN "percentageForDelivery" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "warehouseStorage" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductAndCategory" ALTER COLUMN "percents" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "TaxForRub" ALTER COLUMN "percents" SET DATA TYPE DOUBLE PRECISION;
