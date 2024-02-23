import React from "react";

import Image from "next/image";
import StaticStarRating from "@/app/components/StaticStarRating";

const getAlbumInfo = async (albumId: string) => {
  const data = await fetch(
    `http://localhost:3000/api/lastfm/get-album-id?mbid=${albumId}`
  );

  const response = await fetch(
    `http://localhost:3000/api/get-album?mbid=${albumId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const { albumInfo } = await response.json();
  let albumReviews = null;

  if (albumInfo) {
    albumReviews = albumInfo.reviews;
  }
  const {
    albumData: { album: albumData },
  } = await data.json();

  return { albumData, albumReviews };
};

const AlbumPage = async ({ params }: { params: { id: string } }) => {
  const { albumData, albumReviews } = await getAlbumInfo(params.id);

  const returnTracklist = () => {
    if (albumData?.tracks) {
      return albumData?.tracks?.track.map((curTrack: any, index: number) => {
        return (
          <div
            key={index}
            className=" flex w-full justify-between  border-gray-600 bg-black p-2 hover:bg-slate-900 "
          >
            <div className="flex gap-2">
              <p>{index + 1}.</p>
              <p>{curTrack.name}</p>
            </div>
            <p className="">{convertSecondsToMinutes(curTrack.duration)}</p>
          </div>
        );
      });
    } else return <div>No Tracklist Info Found</div>;
  };

  const convertSecondsToMinutes = (seconds: number) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    let remainingSecondsString =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minutes + ":" + remainingSecondsString;
  };
  return (
    <section className="relative min-h-screen bg-slate-900">
      <div className="z-[5] my-10 w-full rounded-lg bg-slate-800 p-4 text-slate-100 drop-shadow-lg duration-150 ease-in-out  ">
        <div className="flex justify-between ">
          <h1 className="text-3xl">{albumData?.name}</h1>
          <h2 className="text-2xl">{albumData?.artist}</h2>
        </div>

        {albumData && (
          <div className="mt-10 flex flex-col gap-6 text-lg sm:flex-row">
            <div className="flex-shrink-0">
              <Image
                src={`${albumData?.image[3]["#text"]}`}
                alt="album picture"
                width={300}
                height={300}
                className="aspect-square w-[300px] "
              />
            </div>
            <div className=" flex flex-col justify-between">
              <p
                className="mb-2"
                dangerouslySetInnerHTML={
                  albumData?.wiki
                    ? { __html: `${albumData?.wiki.summary}` }
                    : { __html: "" }
                }
              ></p>
              <div className="relative mb-3 box-border w-full   border-gray-600 bg-black  ">
                {returnTracklist()}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="m-auto max-w-[1300px]">
        {!albumReviews && (
          <p className="text-center text-3xl text-white">No Reviews Made Yet</p>
        )}
        {albumReviews?.map((review: any, index: number) => (
          <div
            key={index}
            className="flex  overflow-hidden rounded-lg   bg-slate-950 text-white "
          >
            <div className="float-left inline-block flex-grow-0 p-8">
              <Image
                src={`${review?.user?.image}`}
                alt=""
                width={200}
                height={200}
                className="mr-5 inline-block h-[50px] w-[50px] rounded-full object-cover"
              />
              <h1 className="inline-block text-2xl ">{review.user.name}</h1>
            </div>
            <div className="flex flex-1 justify-between p-4">
              <StaticStarRating rating={review.rating} />
            </div>
            <p className="text-lg">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlbumPage;
