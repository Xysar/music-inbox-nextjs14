import React from "react";
import { getTrackInfo } from "@/lib/spotify";
import { convertMillisToSeconds } from "@/lib/utils";
import SoundWave from "@/app/components/SoundWave";

const page = async ({ params }: { params: { id: string } }) => {
  const trackInfo = await getTrackInfo(params.id);
  console.log(trackInfo);

  return (
    <section className="text-white ">
      <div className="bg-slate-800 rounded-xl">
        <h1 className=" text-3xl text-center">{trackInfo.name}</h1>
        <SoundWave trackInfo={trackInfo} />
      </div>
    </section>
  );
};

export default page;
