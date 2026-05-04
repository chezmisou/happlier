-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL DEFAULT 'default-user',
    "googlePlaceId" TEXT,
    "name" TEXT NOT NULL,
    "formattedAddress" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "rating" REAL,
    "userRatingsTotal" INTEGER,
    "googleMapsUrl" TEXT,
    "websiteUrl" TEXT,
    "photoUrl" TEXT,
    "placeType" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "reviewExcerpt" TEXT,
    "sentiment" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_googlePlaceId_key" ON "Place"("googlePlaceId");

-- CreateIndex
CREATE INDEX "Place_userId_idx" ON "Place"("userId");

-- CreateIndex
CREATE INDEX "Place_placeType_idx" ON "Place"("placeType");
