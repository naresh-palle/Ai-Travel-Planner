-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "travelersCount" INTEGER NOT NULL DEFAULT 1;
