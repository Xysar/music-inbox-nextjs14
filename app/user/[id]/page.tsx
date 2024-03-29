"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import StarRating from "@/app/components/StarRating";
import Navbar from "@/app/components/Navbar";

const UserPage = ({ userId, userInfo, albumDataArray }: any) => {
  const [userReviews, setUserReviews] = useState(userInfo.reviews);
  const [albumsData, setAlbumsData]: any[] = useState(albumDataArray);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || !session.user) {
      redirect("api/auth/signin");
    }
  }, []);

  const getReviewAssets = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userInfo = await response.json();
    setUserReviews(userInfo.reviews);
    const albumResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-user-album-mbids/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const albumIds = await albumResponse.json();

    const promises = await Promise.all(
      albumIds.map((albumId: string) => fetch("api/get-album/albumId"))
    );

    const albumData = await Promise.all(promises);
    setAlbumsData(albumData);
  };

  const handleDelete = async (index: number) => {
    const idTodelete = userReviews[index].id;
    await deleteReview(idTodelete);
    await getReviewAssets();
  };

  const deleteReview = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/delete-review/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleRatingClick = (index: number) => {};

  return (
    <section className=" relative min-h-screen bg-slate-900">
      <div className=" m-auto max-w-[1300px]">
        <Navbar />
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
          {!userReviews[0] && (
            <p className="text-center text-xl text-white ">
              No Reviews Made Yet
            </p>
          )}
          {userReviews.map((review: any, index: number) => (
            <div
              key={review.id}
              className="mb-4 flex flex-col justify-between border-b-2 border-slate-700    text-black lg:flex-row"
            >
              {albumsData[index] && (
                <div className="  flex w-full flex-col items-center  lg:flex-row ">
                  <Image
                    src={albumsData[index]?.image[2]["#text"]}
                    width={200}
                    className="h-[300px] w-[300px]"
                    height={200}
                    alt="Album Cover"
                  />
                  <div className="flex h-full w-full flex-col items-center  justify-center bg-slate-500  p-5 lg:items-start">
                    <h1 className="text-4xl font-bold">
                      {albumsData[index].name}
                    </h1>
                    <h2 className=" text-3xl ">{albumsData[index].artist}</h2>
                  </div>
                </div>
              )}
              <div className="flex h-[300px] flex-col gap-4 bg-slate-900 p-5 lg:w-[80%]">
                <div className="flex items-center justify-between ">
                  <StarRating
                    rating={review.rating}
                    handleClick={handleRatingClick}
                  />

                  {/* {correctUser() && (
                    <button
                      onClick={() => handleDelete(index)}
                      className=" flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-slate-800"
                    >
                      <Image
                        src={"/trash-solid.svg"}
                        width={20}
                        height={20}
                        alt="trash can image"
                      ></Image>
                    </button>
                  )} */}
                </div>
                <div className="">
                  <p className="m-auto h-[175px] overflow-y-scroll text-white ">
                    {review.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// export async function getServerSideProps(context: any) {
//   const userId = context.query.id;

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-user/${userId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const userInfo = await response.json();

//   const userReviews = userInfo.reviews;

//   const promises = await Promise.all(
//     userReviews.map((review: any) => retrieveAlbumById(review.mbid))
//   );

//   const albumDataArray = await Promise.all(promises);

//   return { props: { userId, userInfo, albumDataArray } };
// }

export default UserPage;
