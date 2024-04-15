import prisma from "../prisma";

export const getUser = async (id: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: id!,
    },
  });
  return userInfo;
};
