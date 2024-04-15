"use client";

import React from "react";

const UserReviews = ({ userInfo }: { userInfo: any }) => {
  const handleDelete = async (index: number) => {
    const idTodelete = userReviews[index].id;
    await deleteReview(idTodelete);
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

  return (
    <div>
      <div className="pb-4 ">
        {!userInfo.reviews && (
          <p className="text-center text-xl text-white ">No Reviews Made Yet</p>
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
  );
};

export default UserReviews;
