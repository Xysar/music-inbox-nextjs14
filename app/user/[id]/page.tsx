import React, { useEffect, useState } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/options";
import StarRating from "@/app/components/StarRating";
import Navbar from "@/app/components/Navbar";
import UserReviews from "@/app/components/UserReviews";
import { getUser } from "@/lib/services/users";

const getUserInfo = async (userId: string) => {
  const response = await getUser(userId);
  console.log(response);
  const userInfo = await response.json();
  return userInfo;
};

const UserPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("api/auth/signin");
  }

  const { userInfo } = await getUserInfo(params.id);

  const router = useRouter();

  return (
    <section className=" relative min-h-screen bg-slate-900">
      {JSON.stringify(session, null, 2)}
      <div className=" m-auto max-w-[1300px]">
        <div className="m-auto w-[300px] justify-between  p-10">
          <div className="flex flex-col items-center gap-5 ">
            {/* {user && (
              <Image
                src={`${userInfo?.imageId}`}
                alt=""
                width={200}
                height={200}
                className="h-[200px] w-[200px]  rounded-full object-cover"
              />
            )} */}
            <p className="text-3xl text-white "> {userInfo?.username}</p>
          </div>
        </div>
        <div className="pb-4 ">
          {!userInfo.reviews && (
            <p className="text-center text-xl text-white ">
              No Reviews Made Yet
            </p>
          )}
          {/* {userInfo.reviews && <UserReviews userInfo={userInfo} />} */}
        </div>
      </div>
    </section>
  );
};

export default UserPage;
