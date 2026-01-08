"use client";

import { useForm } from "react-hook-form";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { TbNumber16Small } from "react-icons/tb";
import { Button } from "./interface/button";
import { Card } from "./interface/card";
import { Input } from "./interface/input";

type TokenForm = {
  network: string;
  tokenName: string;
  tokenSymbol: string;
  tokenBanner: string;
  totalSupply: bigint;
  tokenDecimals: number;
};

export function CreateErc20TokenForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TokenForm>({
    defaultValues: {
      network: "",
      tokenName: "",
      tokenSymbol: "",
      tokenBanner: "",
      totalSupply: undefined,
      tokenDecimals: 16,
    },
  });

  const {
    tokenName,
    tokenSymbol,
    tokenBanner,
    network,
    totalSupply,
    tokenDecimals,
  } = watch();

  const onSubmit = async (data: TokenForm) => {
    console.log("Token data:", data);

    const response = await fetch("/api/createToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        network: data.network,
        name: data.tokenName,
        symbol: data.tokenSymbol,
        banner: data.tokenBanner,
        masmupply: data.totalSupply.toString(),
        decimals: data.tokenDecimals,
      }),
    });

    if (response.ok) {
      return alert("Token sucessfully created on Blockchain!");
    } else {
      console.error("Erro creating token and saving on database:");
    }
  };

  return (
    <div className="flex max-md:flex-col gap-6 justify-between">
      <Card className="w-full p-8 rounded-2xl" intent="primary">
        <div className="grid gap-2 relative">
          {/* Chain selector */}
          <div className="col-span-full flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-white text-sm">Network</h3>
              {errors.network && (
                <p className="text-red-500 text-sm">Network is required</p>
              )}
            </div>

            <select
              className="h-11 w-40 px-6 mb-2 text-white text-sm bg-background-alt-2 border-solid  border-border-primary rounded-xl"
              {...register("network", { required: true })}
            >
              <option value="" hidden>
                Select network
              </option>
              <option value="Mainnet">Mainnet</option>
              <option value="Sepolia">Sepolia</option>
            </select>
          </div>

          {/* Token Name */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-white text-sm">Token name</h3>
              {errors.tokenName && (
                <p className="text-red-500 text-sm">Token name is required</p>
              )}
            </div>

            <Input
              intent={"primary"}
              size={"mediumLarge"}
              placeholder="Insert Your Token Name"
              type="text"
              iconLeft={<MdDriveFileRenameOutline className="size-6" />}
              {...register("tokenName", { required: true })}
            />
          </div>

          {/* Token Symbol */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-white text-sm">Token symbol</h3>
              {errors.tokenSymbol && (
                <p className="text-red-500 text-sm">Token symbol is required</p>
              )}
            </div>

            <Input
              intent={"primary"}
              size={"mediumLarge"}
              placeholder="Insert Your Image URl"
              iconLeft={<GiToken className="size-6" />}
              {...register("tokenSymbol", { required: true })}
            />
          </div>

          {/* Token Banner */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h3 className="text-white text-sm">Token banner</h3>
              {errors.tokenBanner && (
                <p className="text-red-500 text-sm">Token banner is required</p>
              )}
            </div>

            <Input
              intent={"primary"}
              size={"mediumLarge"}
              placeholder="Insert Your Image URl"
              iconLeft={<FaArrowAltCircleUp className="size-6" />}
              {...register("tokenBanner", { required: true })}
            />
          </div>

          {/* Total Supply */}
          <div className="flex flex-col gap-2">
            <h3 className="col-span-full flex items-center gap-2 text-white text-sm">
              Total Supply
              {errors.totalSupply && (
                <p className="text-red-500 text-sm">Total Supply is required</p>
              )}
            </h3>

            <Input
              intent={"primary"}
              size={"mediumLarge"}
              placeholder="Ex: 1,000,000"
              iconLeft={<TbNumber16Small className="size-8 -mt-1" />}
              {...register("totalSupply", { required: true })}
            />
          </div>

          <div className="flex">
            <Button
              intent="primary"
              size="medium"
              className="m-2 w-full max-w-64"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button
              className="m-2 w-full max-w-64"
              onClick={handleSubmit(onSubmit)}
              size="medium"
              intent="secondary"
            >
              Create Token
            </Button>
          </div>
        </div>
      </Card>

      {/* Card Preview */}
      <Card size="small" intent="primary">
        <div className="w-full h-40 ">
          <img
            alt="Token banner"
            className="rounded-t-xl h-36 w-full object-cover bg-center"
            src={tokenBanner || "/backgroundCard.png"}
          />
        </div>
        <div className="flex flex-col my-2 mx-2 gap-0.5 text-sm">
          <div className="flex items-center gap-2 font-SpaceGrotesk mb-2 max-md:-mt-6">
            <img
              alt="Token symbol"
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
