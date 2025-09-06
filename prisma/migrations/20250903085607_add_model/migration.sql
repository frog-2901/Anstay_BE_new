-- CreateEnum
CREATE TYPE "ApartmentStatus" AS ENUM ('AVAILABLE', 'MAINTENANCE', 'OCCUPIED');

-- CreateEnum
CREATE TYPE "ApartmentArea" AS ENUM ('HA_NOI', 'HA_LONG');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'HOLD', 'CONFIRMED', 'CANCELLED', 'EXPIRED');

-- CreateTable
CREATE TABLE "apartment_owners" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "apartment_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "ownerId" INTEGER,
    "price_per_day" DOUBLE PRECISION,
    "price_per_month" DOUBLE PRECISION,
    "discount_percent" INTEGER,
    "description" TEXT,
    "max_adults" INTEGER,
    "max_children" INTEGER,
    "num_rooms" INTEGER,
    "status" "ApartmentStatus",
    "area" "ApartmentArea",
    "max_bed" INTEGER,
    "acreage" DOUBLE PRECISION,
    "name_apartment" TEXT,

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartment_images" (
    "id" SERIAL NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "image_url" VARCHAR(255),
    "is_featured" BOOLEAN DEFAULT false,

    CONSTRAINT "apartment_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "capacity" INTEGER,
    "price" DOUBLE PRECISION,
    "max_rooms" INTEGER,
    "max_adults" INTEGER,
    "max_children" INTEGER,
    "discount" INTEGER,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_images" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "image_url" VARCHAR(255),
    "alt_text" VARCHAR(255),

    CONSTRAINT "room_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartment_bookings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "apartmentId" INTEGER NOT NULL,
    "roomId" INTEGER,
    "check_in" TIMESTAMP(3),
    "check_out" TIMESTAMP(3),
    "total_price" DOUBLE PRECISION,
    "status" "BookingStatus",
    "guest_name" VARCHAR(255),
    "guest_phone" VARCHAR(20),
    "guest_email" VARCHAR(255),
    "guest_identity_number" VARCHAR(50),
    "guest_birthday" TIMESTAMP(3),
    "guest_nationality" VARCHAR(100),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "apartment_bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "apartment_owners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_images" ADD CONSTRAINT "apartment_images_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_images" ADD CONSTRAINT "room_images_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_bookings" ADD CONSTRAINT "apartment_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_bookings" ADD CONSTRAINT "apartment_bookings_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_bookings" ADD CONSTRAINT "apartment_bookings_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;
