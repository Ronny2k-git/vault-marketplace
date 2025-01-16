"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "./button";
import { Card } from "./card";

export default function CardLive() {
  return (
    <div>
      <Card intent={"primary"} size={"small"}>
        <img
          className="rounded-t-xl w-full h-36 object-cover"
          src="/usdc.png"
        />
        <div className="flex relative bottom-11">
          <img className="absolute ml-2 size-8" src="/icons/usdcLogo.png" />
          <div className="absolute ml-11 font-normal text-white text-base">
            USDC Vault
            <br />
            <div className="text-[10px] -mt-2">Sepolia</div>
          </div>
        </div>
        <div className="flex mt-4 ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <img className="size-4 mr-1" src="/icons/user-group.png" />
            <div>Participants:</div>
          </div>
          <div>4</div>
        </div>
        <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <img className="size-4 mr-1" src="/icons/money.png" />
            <div>Total deposited:</div>
          </div>
          <div>5,600 USD</div>
        </div>
        <div className="flex  ml-4 font-SpaceGrotesk justify-between mr-4">
          <div className="flex">
            <img className="size-4 mr-1" src="/icons/time.png" />
            <div>Status:</div>
          </div>
          <div className="text-live-accent">Live</div>
        </div>
        <div className="ml-4 mt-2">
          <Button intent={"primary"} size={"small"}>
            View now
            <FaArrowRightLong />
          </Button>
        </div>
      </Card>
    </div>
  );
}
