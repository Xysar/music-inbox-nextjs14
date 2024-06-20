-- CreateTable
CREATE TABLE "TrackReview" (
    "id" SERIAL NOT NULL,
    "timeStamp" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "TrackReview_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TrackReview" ADD CONSTRAINT "TrackReview_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackReview" ADD CONSTRAINT "TrackReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
