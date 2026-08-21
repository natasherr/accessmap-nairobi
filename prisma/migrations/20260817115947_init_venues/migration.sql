-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ramp" BOOLEAN NOT NULL,
    "lift" BOOLEAN NOT NULL,
    "accessibleToilet" BOOLEAN NOT NULL,
    "accessibleParking" BOOLEAN NOT NULL,
    "tactilePaving" BOOLEAN NOT NULL,
    "wideCorridors" BOOLEAN NOT NULL,
    "audioAssistance" BOOLEAN NOT NULL,
    "staffAssistance" BOOLEAN NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL,
    "isSeeded" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Venue_slug_key" ON "Venue"("slug");
