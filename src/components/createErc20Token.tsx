"use client";

import { GiToken } from "react-icons/gi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TbNumber16Small } from "react-icons/tb";
import { Card } from "./interface/card";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { PiNetwork } from "react-icons/pi";
import { Input } from "./interface/input";
import { Button } from "./interface/button";
import { useState } from "react";

export function CreateErc20Token() {
  const [network, setNetwork] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenBanner, setTokenBanner] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(16);

  return (
    <div className="flex max-md:flex-col gap-6 justify-between">
      <Card size="mediumHigh" intent="primary">
        <div className="flex flex-col relative">
          <h3 className="text-white text-xs">Network</h3>
          <div className="flex">
            <select
              className="h-5 w-40 px-6 mb-2 text-white text-xs bg-background-alt-2 border-solid  border-border-primary rounded-md"
              onChange={(e) => setNetwork(e.target.value)}
            >
              <option value="" hidden>
                Select network
              </option>
              <option value="Mainnet">Mainnet</option>
              <option value="Sepolia">Sepolia</option>
            </select>
            <PiNetwork className="size-4 absolute ml-1" color="white" />
          </div>
          <h3 className="text-white text-xs my-1">Token name</h3>
          <div className="flex items-center">
            <Input
              className="pl-7"
              intent={"primary"}
              size={"mediumLarge"}
              placeholder="Insert Your Token Name"
              type="text"
              onChange={(e) => setTokenName(e.target.value)}
            />
            <MdOutlineDriveFileRenameOutline
              className="size-4 absolute -mt-3 ml-2"
              color="white"
            />
          </div>
          <h3 className="text-white text-xs">Token symbol</h3>
          <div className="flex items-center">
            <Input
              className="pl-7"
              intent={"primary"}
              size={"mediumLarge"}
              placeholder="Insert Your Image URl"
              onChange={(e) => setTokenSymbol(e.target.value)}
            />
            <GiToken className="size-4 absolute -mt-2 ml-2" color="white" />
          </div>
          <h3 className="text-white text-xs">Token Banner</h3>
          <div className="flex items-center">
            <Input
              className="pl-7"
              intent={"primary"}
              size={"mediumLarge"}
              placeholder="Insert Your Image URl"
              onChange={(e) => setTokenBanner(e.target.value)}
            />
            <FaArrowAltCircleUp
              className="size-4 absolute -mt-2 ml-2"
              color="white"
            />
          </div>
          <h3 className="flex max-sm:flex-col sm:items-center sm:gap-2 text-white text-xs">
            Total Supply
            <span className="text-gray-300 text-xs sm:mt-1">
              (Max supply for the token)
            </span>
          </h3>
          <div className="flex items-center">
            <Input
              className="pl-7"
              intent={"primary"}
              size={"mediumLarge"}
              placeholder="Ex: 1,000,000"
              onChange={(e) => setTotalSupply(e.target.value)}
            />
            <TbNumber16Small className="size-7 -mt-2 absolute" color="white" />
          </div>
          <Button className="mx- my-2 max-w-64" size="small" intent="secondary">
            Create token
          </Button>
        </div>
      </Card>
      <Card size="small" intent="primary">
        <div className="w-full h-40 ">
          <img
            className="rounded-t-xl h-36 w-full object-cover bg-center"
            src={tokenBanner || "/backgroundCard.png"}
          />
        </div>
        <div className="flex flex-col my-2 mx-2 gap-0.5 text-sm">
          <div className="flex items-center gap-2 font-SpaceGrotesk mb-2 max-md:-mt-6">
            <img
              className="size-8 rounded-full bg-center bg-cover"
              src={tokenSymbol || "/icons/Frame.png"}
            />
            <h3>{tokenName || "Token name"}</h3>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Chain selected:</h3>
            <div className="text-gray-100">{network || "None"}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Total supply:</h3>
            <div className="text-gray-100">{totalSupply || 0}</div>
          </div>
          <div className="flex font-SpaceGrotesk justify-between">
            <h3>Decimals</h3>
            <div className="text-gray-100">{tokenDecimals}</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
