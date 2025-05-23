"use client";

import { GiToken } from "react-icons/gi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TbNumber16Small } from "react-icons/tb";
import { Card } from "./interface/card";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { PiNetwork } from "react-icons/pi";
import { Input } from "./interface/input";

export function CreateErc20Token() {
  return (
    <div className="flex max-md:flex-col gap-6 justify-between items-center">
      <div className="flex flex-col gap- relative">
        <h3 className="text-white text-sm">Network</h3>
        <div className="flex">
          <select className="h-5 w-40 px-6 mb-2 text-white text-sm bg-background-alt-2 border-solid  border-border-primary rounded-md">
            <option value="" disabled hidden>
              Select network
            </option>
            <option value="Mainnet">Mainnet</option>
            <option value="Sepolia">Sepolia</option>
          </select>
          <PiNetwork className="size-4 absolute ml-1" color="white" />
        </div>
        <h3 className="text-white my-1">Token name</h3>
        <div className="flex items-center">
          <Input
            intent={"primary"}
            size={"mediumLarge"}
            placeholder="Ex: 1.20"
            type="text"
          />
          <MdOutlineDriveFileRenameOutline
            className="size-4 absolute -mt-2 ml-2"
            color="white"
          />
        </div>
        <h3 className="text-white">Token symbol</h3>
        <div className="flex items-center">
          <Input
            intent={"primary"}
            size={"mediumLarge"}
            placeholder="Ex: 1.20"
          />
          <GiToken className="size-4 absolute -mt-2 ml-2" color="white" />
        </div>
        <h3 className="text-white">Token total supply</h3>
        <div className="flex items-center">
          <Input
            intent={"primary"}
            size={"mediumLarge"}
            placeholder="Ex: 1,000,000"
          />
          <FaArrowAltCircleUp
            className="size-4 absolute -mt-2 ml-2"
            color="white"
          />
        </div>
        <h3 className="flex max-sm:flex-col sm:gap-2 text-white">
          Token decimals
          <span className="text-gray-500 text-sm sm:mt-1">
            (Decimal places for the token)
          </span>
        </h3>
        <div className="flex items-center">
          <Input
            intent={"primary"}
            size={"mediumLarge"}
            placeholder="Ex: 1,000,000"
          />
          <TbNumber16Small className="size-7 -mt-2 absolute" color="white" />
        </div>
      </div>
      <Card size="small" intent="primary">
        <div className="w-full h-40 ">
          <img
            className="rounded-t-xl h-36 w-full object-cover bg-center"
            src={"/backgroundCard.png"}
          />
        </div>
        <div className="flex flex-col my-2 mx-2 gap-0.5">
          <div className="flex items-center gap-2 font-SpaceGrotesk mb-2 max-md:-mt-6">
            <img
              className="size-8 rounded-full bg-center bg-cover"
              src={"/icons/Frame.png"}
            />
            <h3>Token Name</h3>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Chain selected:</h3>
            <div className="text-gray-100">Sepolia</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Total supply:</h3>
            <div className="text-gray-100">100M</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Decimals</h3>
            <div className="text-gray-100">16</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
