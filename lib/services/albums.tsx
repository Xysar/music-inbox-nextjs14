import prisma from "../prisma";

export const getAlbumData = async (mbid: string) => {
  const albumInfo = await prisma.album.findUnique({
    where: {
      id: mbid!,
    },
    include: {
      tracks: {
        include: {
          trackReviews: {
            include: {
              user: {
                select: {
                  name: true,
                  id: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return albumInfo;
};
