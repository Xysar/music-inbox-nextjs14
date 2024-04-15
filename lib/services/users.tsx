import prisma from "../prisma";

export const getUser = async (id: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: id!,
    },
    include: {
      reviews: {
        select: {
          id: true,
          rating: true,
          text: true,
          album: true,
        },
      },
    },
  });
  return userInfo;
};
