import React, { useEffect, useState } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/options";

import UserReviews from "@/app/components/UserReviews";
import { getUser } from "@/lib/services/users";
import { Album } from "@/types";
import { Review } from "@prisma/client";

const getUserInfo = async (userId: string) => {
  const userInfo = await getUser(userId);
  return userInfo;
};

const UserPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const userOwnsAccount = session?.user.id == params.id;

  const userInfo = await getUserInfo(params.id);

  return (
    <section className="relative min-h-screen bg-slate-900">
      <div className=" m-auto max-w-[1300px]">
        <div className="m-auto w-[300px] justify-between  p-10">
          <div className="flex flex-col items-center gap-5 ">
            {userInfo && (
              <Image
                src={`${userInfo?.image}`}
                alt=""
                width={200}
                height={200}
                className="h-[200px] w-[200px]  rounded-full object-cover"
              />
            )}
            <p className="text-3xl text-white "> {userInfo?.name}</p>
          </div>
        </div>
        <div className="pb-4 ">
          {!userInfo.reviews && (
            <p className="text-center text-xl text-white ">
              No Reviews Made Yet
            </p>
          )}
          {userInfo.reviews && (
            <UserReviews
              userInfo={userInfo}
              userOwnsAccount={userOwnsAccount}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default UserPage;
