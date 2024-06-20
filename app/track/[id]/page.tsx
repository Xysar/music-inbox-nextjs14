import React from "react";
import { getTrackInfo } from "@/lib/spotify";
import { convertMillisToSeconds } from "@/lib/utils";
import Link from "next/link";
import SoundWave from "@/app/components/SoundWave";
import { getTrackData } from "@/lib/services/tracks";

const page = async ({ params }: { params: { id: string } }) => {
  const trackInfo = await getTrackInfo(params.id);
  const trackData = await getTrackData(params.id);

  const soundArray = new Array(25)
    .fill(1)
    .map(() => Math.floor(Math.random() * (110 - 20) + 20));
  console.log(trackData);

  console.log(trackInfo);
  return (
    <section className="text-white max-w-[1000px] m-auto">
      <div className="bg-slate-800 m-auto p-2 ">
        <div className="  relative ">
          <h1 className=" text-3xl text-center max-w-fit m-auto">
            {trackInfo.name}
          </h1>
          <Link
            href={`/create-review`}
            className="bg-orange-600 absolute  right-0 max-h-fit  bottom-0 top-0 m-auto  rounded-lg   hover:bg-slate-600 p-2 duration-150 ease-in-out"
          >
            Create Review
          </Link>
        </div>
        <SoundWave
          trackInfo={trackInfo}
          interactive={false}
          soundArray={soundArray}
        />
      </div>{" "}
      {!trackData && (
        <p className="text-center py-4 px-2 text-white text-3xl">
          No reviews yet
        </p>
      )}
    </section>
  );
};

export default page;
