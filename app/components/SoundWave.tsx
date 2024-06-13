"use client";
import React, { useEffect, useRef, useState } from "react";
import { convertMillisToSeconds } from "@/lib/utils";
import useMousePosition from "./hooks/useMousePosition";
const SoundWave = ({ trackInfo }: { trackInfo: any }) => {
  const mousePosition = useMousePosition(true);
  const cursor = useRef(null);
  const box = useRef(null);
  const [soundArray, setSoundArray] = useState(
    new Array(25)
      .fill(1)
      .map((prev) => Math.floor(Math.random() * (128 - 20) + 20))
  );
  if (cursor.current) {
    cursor.current.style.left =
      mousePosition.x - box.current.getBoundingClientRect().left + "px";
    console.log(cursor.current.style.left);
  }

  useEffect(() => {
    var rect = box.current.getBoundingClientRect();
    var x = mousePosition.x - rect.left; //x position within the element.
    var y = mousePosition.y - rect.top; //y position within the element.
    console.log("Left? : " + x + " ; Top? : " + y + ".");
  }, []);

  return (
    <div className="m-auto flex items-center justify-center ">
      <p className="b">0:00 {JSON.stringify(mousePosition)}</p>
      <div className="p-5  max-w-[700px]  relative">
        <div
          ref={box}
          className=" h-32 flex gap-2 bg-slate-500 items-center z-10 relative justify-between"
        >
          {soundArray.map((single, index) => {
            return (
              <div
                key={index}
                style={{ height: `calc(${single}px)` }}
                className={`w-[1vw] rounded-full bg-clip-content bg-white bg-opacity-50`}
              ></div>
            );
          })}
        </div>
        <div className="absolute left-0 top-0  w-[200px] h-32 z-0 bg-red-500"></div>
        <div className="relative mt-5">
          <div ref={cursor} className="absolute right-[16px]">
            <div className="bg-slate-500 w-8 h-8 rounded-full relative ">
              <div
                style={{
                  borderLeft: "16px solid transparent",
                  borderRight: "16px solid transparent",
                  borderBottom:
                    "32px solid rgb(100 116 139 / var(--tw-border-opacity))",
                }}
                className="border-b-slate-500 w-0 h-0    bottom-[20px]  absolute"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <p className="">{convertMillisToSeconds(trackInfo.duration_ms)}</p>
    </div>
  );
};

export default SoundWave;
