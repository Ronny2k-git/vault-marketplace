"use client";

import { GiToken } from "react-icons/gi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TbNumber16Small } from "react-icons/tb";
import { Card } from "./interface/card";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { PiNetwork } from "react-icons/pi";
import { Input } from "./interface/input";
import { Button } from "./interface/button";
import { useForm } from "react-hook-form";

type TokenForm = {
  network: string;
  tokenName: string;
  tokenSymbol: string;
  tokenBanner: string;
  totalSupply: string;
  tokenDecimals: number;
};

export function CreateErc20Token() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TokenForm>({
    defaultValues: {
      network: "",
      tokenName: "",
      tokenSymbol: "",
      tokenBanner: "",
      totalSupply: "",
      tokenDecimals: 16,
    },
  });

  const onSubmit = (data: TokenForm) => {
    console.log("Token data:", data);
    //Create the token functionality would go here
  };

  //For preview
  const tokenName = watch("tokenName");
  const tokenSymbol = watch("tokenSymbol");
  const tokenBanner = watch("tokenBanner");
  const network = watch("network");
  const totalSupply = watch("totalSupply");
  const tokenDecimals = watch("tokenDecimals");

  return (
    <div className="flex max-md:flex-col gap-6 justify-between">
      <Card size="mediumHigh" intent="primary">
        <div className="flex flex-col relative">
          <h3 className="text-white text-xs">Network</h3>
          <div className="flex">
            <select
              className="h-5 w-40 px-6 mb-2 text-white text-xs bg-background-alt-2 border-solid  border-border-primary rounded-md"
              {...register("network", { required: true })}
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
              {...register("tokenName", { required: true })}
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
              {...register("tokenName", { required: true })}
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
              {...register("tokenBanner", { required: true })}
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
              {...register("totalSupply", { required: true })}
            />
            <TbNumber16Small className="size-7 -mt-2 absolute" color="white" />
          </div>
          <Button
            className="mx- my-2 max-w-64"
            onClick={handleSubmit(onSubmit)}
            size="small"
            intent="secondary"
          >
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
