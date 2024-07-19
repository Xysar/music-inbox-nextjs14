"use client";
import React, { useEffect, useRef, useState } from "react";
import { convertMillisToSeconds } from "@/lib/utils";
import useMousePosition from "./hooks/useMousePosition";
import styles from "../stylesheets/styles.module.css";
import { TrackReview } from "@prisma/client";
import { TrackReviewWithUser } from "@/types";

const SoundWaveReviews = ({
  trackInfo,
  soundArray,
  trackReviews,
  chosenReview,
  setChosenReview,
}: {
  trackInfo: any;
  soundArray: number[];
  trackReviews: TrackReviewWithUser[];
  chosenReview: number;
  setChosenReview: React.Dispatch<any>;
}) => {
  const mousePosition = useMousePosition({ includeTouch: true });
  const box = useRef<HTMLDivElement | null>(null);
  const [rect, setRect] = useState<any>(null);

  const handleResize = () => {
    setRect({
      width: box.current?.getBoundingClientRect().width,
      left: box.current?.getBoundingClientRect().left,
      right: box.current?.getBoundingClientRect().right,
      top: box.current?.getBoundingClientRect().top! + window.scrollY,
      bottom: box.current?.getBoundingClientRect().bottom! + window.scrollY,
    });
  };

  let sector = 0;
  let inBound =
    mousePosition.x! > rect?.left &&
    mousePosition?.x! < rect?.right &&
    mousePosition?.y! < rect?.bottom - window.scrollY &&
    mousePosition?.y! > rect?.top - window.scrollY;
  if (inBound) {
    sector = (mousePosition.x! - rect.left) / (rect?.width / 25);
  }

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [trackInfo]);

  const handleSelectReviewClick = (index: number) => {
    setChosenReview(index);

    console.log(index);
  };

  return (
    <div className="m-auto p-4 flex items-center justify-center">
      <p className=" ">0:00</p>
      <div className="p-2 flex-1 max-w-[650px] relative">
        <div
          ref={box}
          className=" h-32 flex  gap-1 bg-slate-700 items-center z-10 relative  justify-between "
        >
          {soundArray.map((single, index) => {
            return (
              <div
                key={index}
                style={{
                  height: `calc(${single}px)`,
                  backgroundColor: `${
                    index <
                    (trackReviews[chosenReview].timeStamp * rect?.width) /
                      (rect?.width / 25)
                      ? "white"
                      : "gray"
                  }`,
                }}
                className={`w-1 max-w-2 flex-1 rounded-full bg-clip-content bg-slate-400 `}
              ></div>
            );
          })}
        </div>
        {trackReviews.map((singleTrackReview, index: number) => (
          <div className="relative mt-5" key={index}>
            {/* Cursor array */}
            <div
              style={{
                left: singleTrackReview.timeStamp! * rect?.width + "px",
              }}
              className={`absolute `}
            >
              <div
                onClick={() => handleSelectReviewClick(index)}
                className="bg-slate-500 border border-slate-500 hover:border-white hover:z-20 box-border w-8 h-8 rounded-full right-[16px] relative"
              >
                <div
                  className={`${
                    chosenReview == index ? "bg-white" : ""
                  } w-6 h-6  rounded-full left-0 right-0 m-auto top-1 duration-200 z-10 relative`}
                ></div>
                <div
                  style={{
                    borderLeft: "15px solid transparent",
                    borderRight: "15px solid transparent",
                    borderBottom:
                      "31px solid rgb(100 116 139 / var(--tw-border-opacity))",
                  }}
                  className="border-b-slate-500 w-0 h-0 bottom-[20px]  absolute"
                ></div>
              </div>
              <p className="text-white absolute left-[25px] top-1">
                {convertMillisToSeconds(
                  (singleTrackReview.timeStamp * rect?.width) /
                    (rect?.width / trackInfo.duration_ms)
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="">{convertMillisToSeconds(trackInfo.duration_ms)}</p>
    </div>
  );
};

export default SoundWaveReviews;
