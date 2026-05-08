-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('DRAFT', 'PLANNED', 'BOOKED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TripVisibility" AS ENUM ('PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "CollaboratorRole" AS ENUM ('OWNER', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('SIGHTSEEING', 'FOOD', 'ADVENTURE', 'CULTURE', 'SHOPPING', 'TRANSPORT', 'RELAXATION', 'OTHER');

-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('FLIGHT', 'TRAIN', 'BUS', 'CAR_RENTAL', 'HOTEL', 'ACTIVITY', 'OTHER');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('USD', 'EUR', 'GBP', 'INR', 'AED', 'SGD', 'AUD', 'CAD', 'JPY');

-- CreateEnum
CREATE TYPE "BudgetCategory" AS ENUM ('TRANSPORT', 'STAY', 'FOOD', 'ACTIVITIES', 'SHOPPING', 'MISC');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TripStatus" NOT NULL DEFAULT 'DRAFT',
    "visibility" "TripVisibility" NOT NULL DEFAULT 'PRIVATE',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "timezone" TEXT,
    "primaryDestinationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaborator" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "CollaboratorRole" NOT NULL DEFAULT 'VIEWER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collaborator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "placeId" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraryDay" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "destinationId" TEXT,
    "dayNumber" INTEGER NOT NULL,
    "date" TIMESTAMP(3),
    "title" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItineraryDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "dayId" TEXT,
    "destinationId" TEXT,
    "type" "ActivityType" NOT NULL DEFAULT 'OTHER',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "cost" DECIMAL(12,2),
    "currency" "CurrencyCode",
    "placeId" TEXT,
    "source" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "destinationId" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "checkIn" TIMESTAMP(3),
    "checkOut" TIMESTAMP(3),
    "placeId" TEXT,
    "source" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "type" "BookingType" NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "hotelId" TEXT,
    "provider" TEXT,
    "reference" TEXT,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "amount" DECIMAL(12,2),
    "currency" "CurrencyCode",
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "category" "BudgetCategory" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" "CurrencyCode" NOT NULL DEFAULT 'USD',
    "planned" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedPlace" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "placeId" TEXT,
    "source" TEXT,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedPlace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Trip_ownerId_updatedAt_idx" ON "Trip"("ownerId", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "Trip_status_startDate_idx" ON "Trip"("status", "startDate");

-- CreateIndex
CREATE INDEX "Trip_primaryDestinationId_idx" ON "Trip"("primaryDestinationId");

-- CreateIndex
CREATE INDEX "Collaborator_userId_idx" ON "Collaborator"("userId");

-- CreateIndex
CREATE INDEX "Collaborator_tripId_role_idx" ON "Collaborator"("tripId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "Collaborator_tripId_userId_key" ON "Collaborator"("tripId", "userId");

-- CreateIndex
CREATE INDEX "Destination_tripId_idx" ON "Destination"("tripId");

-- CreateIndex
CREATE INDEX "Destination_tripId_city_idx" ON "Destination"("tripId", "city");

-- CreateIndex
CREATE INDEX "Destination_placeId_idx" ON "Destination"("placeId");

-- CreateIndex
CREATE INDEX "ItineraryDay_tripId_date_idx" ON "ItineraryDay"("tripId", "date");

-- CreateIndex
CREATE INDEX "ItineraryDay_destinationId_idx" ON "ItineraryDay"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "ItineraryDay_tripId_dayNumber_key" ON "ItineraryDay"("tripId", "dayNumber");

-- CreateIndex
CREATE INDEX "Activity_tripId_dayId_order_idx" ON "Activity"("tripId", "dayId", "order");

-- CreateIndex
CREATE INDEX "Activity_tripId_startTime_idx" ON "Activity"("tripId", "startTime");

-- CreateIndex
CREATE INDEX "Activity_destinationId_idx" ON "Activity"("destinationId");

-- CreateIndex
CREATE INDEX "Activity_placeId_idx" ON "Activity"("placeId");

-- CreateIndex
CREATE INDEX "Hotel_tripId_checkIn_idx" ON "Hotel"("tripId", "checkIn");

-- CreateIndex
CREATE INDEX "Hotel_destinationId_idx" ON "Hotel"("destinationId");

-- CreateIndex
CREATE INDEX "Hotel_placeId_idx" ON "Hotel"("placeId");

-- CreateIndex
CREATE INDEX "Booking_tripId_type_status_idx" ON "Booking"("tripId", "type", "status");

-- CreateIndex
CREATE INDEX "Booking_hotelId_idx" ON "Booking"("hotelId");

-- CreateIndex
CREATE INDEX "Booking_startsAt_idx" ON "Booking"("startsAt");

-- CreateIndex
CREATE INDEX "Budget_tripId_category_idx" ON "Budget"("tripId", "category");

-- CreateIndex
CREATE INDEX "Budget_tripId_planned_idx" ON "Budget"("tripId", "planned");

-- CreateIndex
CREATE INDEX "SavedPlace_userId_updatedAt_idx" ON "SavedPlace"("userId", "updatedAt" DESC);

-- CreateIndex
CREATE INDEX "SavedPlace_placeId_idx" ON "SavedPlace"("placeId");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_primaryDestinationId_fkey" FOREIGN KEY ("primaryDestinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaborator" ADD CONSTRAINT "Collaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryDay" ADD CONSTRAINT "ItineraryDay_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryDay" ADD CONSTRAINT "ItineraryDay_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "ItineraryDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPlace" ADD CONSTRAINT "SavedPlace_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
