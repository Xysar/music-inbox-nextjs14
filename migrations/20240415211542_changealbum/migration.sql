-- DropIndex
DROP INDEX "Album_name_key";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "artist" TEXT,
ADD COLUMN     "imageId" TEXT;
