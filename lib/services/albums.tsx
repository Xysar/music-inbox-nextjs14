import prisma from "../prisma";

export const getAlbum = async (mbid: string) => {
  const albumInfo = await prisma.album.findUnique({
    where: {
      id: mbid!,
    },
    include: {
      reviews: {
        select: {
          rating: true,
          text: true,
          user: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return albumInfo;
};
