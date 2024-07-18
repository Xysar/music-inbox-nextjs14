import prisma from "../prisma";

export const getTrackData = async (id: string) => {
  const trackData = await prisma.track.findUnique({
    where: {
      id: id!,
    },
    include: {
      trackReviews: true,
    },
  });
  return trackData;
};
