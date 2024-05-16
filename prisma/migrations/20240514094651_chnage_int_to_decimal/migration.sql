-- CreateTable
CREATE TABLE "ProductAndCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "percents" INTEGER NOT NULL,

    CONSTRAINT "ProductAndCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxForRub" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "percents" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "TaxForRub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdvertisingForRub" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "percents" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "AdvertisingForRub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gabarit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "percentageForDelivery" DECIMAL(65,30) NOT NULL,
    "warehouseStorage" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Gabarit_pkey" PRIMARY KEY ("id")
);
