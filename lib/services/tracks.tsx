import prisma from "../prisma";

export const getTrackData = async (id: string) => {
  const trackData = await prisma.track.findUnique({
    where: {
      id: id!,
    },
    include: {
      trackReviews: {
        select: {
          timeStamp: true,
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
  return trackData;
};
