"use client";

import { Card } from "../interface/card";

export default function CardCreate() {
  return (
    <div>
      <Card intent={"primary"} size={"small"}>
        <div className="relative w-full h-fit aspect-video overflow-hidden flex-grow-0">
          <div
            className="rounded-t-xl h-36 w-full object-cover opacity-30
          bg-[url(/backgroundCard.png)]"
          />
          <div className="flex z-40 bottom-2 gap-2 left-2 absolute">
            <img className="size-8 mt-1" src="/icons/frame.png" />
            <div className=" font-normal text-white text-base">
              Unnamed
              <br />
              <div className="text-[10px] -mt-2">No chain selected</div>
            </div>
            <div className="-ml-14 opacity-45 ">
              <img
                className="size-16 absolute bottom-9"
                src="/icons/iconFrame.png"
              />
            </div>
          </div>
        </div>
        <div className="flex mt-4 ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <div>Minimum Deposit</div>
          </div>
          <div>4</div>
        </div>
        <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <div>Max dep.per wallet</div>
          </div>
          <div>5,600 USDC</div>
        </div>
      </Card>
    </div>
  );
}
