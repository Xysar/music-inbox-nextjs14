/*
  Warnings:

  - You are about to drop the column `artist` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `albumId` on the `TrackReview` table. All the data in the column will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrackReview" DROP CONSTRAINT "TrackReview_albumId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "artist",
ADD COLUMN     "artists" TEXT[];

-- AlterTable
ALTER TABLE "TrackReview" DROP COLUMN "albumId";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "AlbumReview" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AlbumReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "artists" TEXT[],
    "name" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AlbumReview" ADD CONSTRAINT "AlbumReview_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumReview" ADD CONSTRAINT "AlbumReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackReview" ADD CONSTRAINT "TrackReview_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
