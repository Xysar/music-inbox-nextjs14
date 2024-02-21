import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const RandomUsers = ({ users }: any) => {
  const usersToDisplay = users?.slice(0, 5);
  const router = useRouter();

  return (
    <div className="mx-4 flex-1 rounded-lg bg-slate-800 p-4 text-white">
      <h2 className=" pb-4 text-3xl">Users on the Site</h2>
      <ul className="flex flex-col flex-wrap items-center justify-evenly gap-10 rounded-lg bg-slate-800  md:flex-row  ">
        {usersToDisplay?.map((user: any, index: any) => (
          <li
            key={index}
            onClick={() => {
              router.push(`/user/${user?.clerkId}`);
            }}
            className="box-content w-[300px]  cursor-pointer rounded-lg p-4 text-white duration-200 ease-in-out hover:bg-slate-950 md:w-[200px]"
          >
            <Image
              src={user.imageId}
              alt="user picture "
              width={300}
              height={300}
              className="mb-3 h-[300px] w-[300px]  rounded-full   object-cover md:h-[200px] md:w-[200px] "
            />
            <h2 className="line-clamp-1 overflow-ellipsis pb-6 ">
              {user.username}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomUsers;
