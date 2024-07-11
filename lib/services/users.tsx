import prisma from "../prisma";

export const getUser = async (id: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: id!,
    },
    include: {
      albumReviews: {
        select: {
          id: true,
          rating: true,
          text: true,
          album: true,
        },
      },
      trackReviews: {
        select: {
          id: true,
          timeStamp: true,
          text: true,
          track: true,
        },
      },
    },
  });
  return userInfo;
};
