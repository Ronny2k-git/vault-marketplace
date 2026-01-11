"use client";

import { FormValues } from "@/global/types";
import {
  bannerUrlAtom,
  endDateAtom,
  maxDepositAtomCreate,
  minDepositAtomCreate,
  selectedNetworkAtom,
  startDateAtom,
  vaultLogoAtom,
  vaultNameAtom,
} from "@/utils/atom";
import { useAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import SelectDate from "../interface/DatePickerInput";
import { Input } from "../interface/input";

type CardCreateProps = {
  onSubmit: (data: FormValues) => Promise<void>;
};

export function VaultCardCreate({ onSubmit }: CardCreateProps) {
  const [selectedNetwork, setSelectedNetwork] = useAtom(selectedNetworkAtom);
  const [, setVaultName] = useAtom(vaultNameAtom);
  const [, setVaultLogo] = useAtom(vaultLogoAtom);
  const [, setBannerUrl] = useAtom(bannerUrlAtom);
  const [, setMinDeposit] = useAtom(minDepositAtomCreate);
  const [, setMaxDeposit] = useAtom(maxDepositAtomCreate);
  const [, setStartDate] = useAtom(startDateAtom);
  const [, setEndDate] = useAtom(endDateAtom);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      network: "",
      vaultName: "",
      vaultLogo: "",
      bannerUrl: "",
      assetToken: "" as `0x${string}`,
      salt: BigInt(""),
      minDeposit: BigInt(""),
      maxDeposit: BigInt(""),
      startDate: null,
      endDate: null,
    },
  });

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US");
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="flex flex-col gap-4">
      <Card className="h-auto" intent={"primary"} size={"extrahigh"}>
        <div className="flex items-center gap-2">
          <h3 className="text-white text-xs">Network</h3>
          {errors.network && (
            <p className="text-red-500 text-[11px] ml-2 text-semibold ">
              {errors.network.message}
            </p>
          )}
        </div>

        <div className="relative">
          <select
            className={`py-2 px-8 my-3 text-white rounded-md text-sm bg-button-bg-primary
             ${selectedNetwork === "" ? "text-gray-300" : "text-white"}`}
            defaultValue=""
            {...register("network", { required: "Network is required" })}
            onChange={(e) => setSelectedNetwork(e.target.value)}
          >
            <option value="" disabled hidden>
              Select network
            </option>
            <option value="Sepolia">Sepolia</option>
            <option value="Solana">Solana</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Base">Base</option>
            <option value="Optimism">Optimism</option>
            <option value="Polygon">Polygon</option>
          </select>
          <img
            alt="Icon"
            className="absolute top-2 left-2.5 mt-0.5 size-4"
            src="/icons/iconSelect.png"
          />
        </div>

        <div className=" h-px w-full my-3 bg-border-primary" />

        <div className="grid grid-cols-2 gap-4">
          {/* Vault Name */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white text-xs mb-1">Vault Name</h3>
            {errors.vaultName && (
              <p className="text-red-500 text-[11px] ml-2 text-semibold">
                {errors.vaultName.message}
              </p>
            )}

            <Input
              {...register("vaultName", {
                required: {
                  value: true,
                  message: "The vault name is required",
                },
                minLength: {
                  value: 5,
                  message: "Vault Name must be at least 5 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Vault Name must be at most 20 characters",
                },
              })}
              placeholder="Enter name"
              intent={"primary"}
              size={"mediumLarge"}
              onChange={(e) => setVaultName(e.target.value)}
            />
          </div>

          {/* Vault Logo */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white text-xs mb-1">Vault Logo</h3>
            {errors.vaultLogo && (
              <p className="text-red-500 text-[11px] ml-2 text-semibold ">
                {errors.vaultLogo.message}
              </p>
            )}

            <Input
              placeholder="Enter URL"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("vaultLogo", {
                required: {
                  value: true,
                  message: "The vault logo is required",
                },
                pattern: {
                  value:
                    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
                  message: "Invalid format URL",
                },
              })}
              onChange={(e) => setVaultLogo(e.target.value)}
            />
          </div>

          {/* Banner Url */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white text-xs mb-1">Banner URL</h3>
            {errors.bannerUrl && (
              <p className="text-red-500 text-[11px] ml-2 text-semibold ">
                {errors.bannerUrl.message}
              </p>
            )}
            <Input
              placeholder="Enter URL"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("bannerUrl", {
                required: {
                  value: true,
                  message: "The vault banner is required",
                },
                pattern: {
                  value:
                    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
                  message: "Invalid format URL",
                },
              })}
              onChange={(e) => setBannerUrl(e.target.value)}
            />
          </div>

          {/* Salt Token */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white text-xs mb-1">Salt</h3>
            <Input
              placeholder="Enter salt (unique value)"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("salt", { required: true, valueAsNumber: true })}
            />
          </div>

          {/* Asset Token */}
          <div className="flex flex-col gap-1 col-span-full">
            <h3 className="text-white text-xs mb-1">Asset Token</h3>
            {errors.assetToken && (
              <p className="text-red-500 text-[11px] ml-2 text-semibold ">
                {errors.assetToken.message}
              </p>
            )}
            <Input
              placeholder="Enter address"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("assetToken", {
                required: {
                  value: true,
                  message: "The token address is required",
                },
                // pattern: {
                //   value: /^0x[a-fA-F0-9]{40}$/,
                //   message: "Invalid address format",
                // },
              })}
            />
          </div>

          <div className=" h-px w-full col-span-full my-3 bg-border-primary" />

          {/* Min Deposit */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white text-xs mb-1 flex">
              Minimum Deposit per wallet
              <div className="text-[10px] text-text-foreground ml-1">
                (optional)
              </div>
            </h3>
            <h4 className="text-text-foreground text-[10px] mb-1">
              The minimum amount that can be deposited per transaction
            </h4>
            <Input
              placeholder="Enter value"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("minDeposit", {})}
              onChange={(e) => setMinDeposit(BigInt(e.target.value))}
            />
          </div>

          {/* Max Deposit */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white text-xs mb-1 flex">
              Maximum Deposit per wallet
              <div className="text-[10px] text-text-foreground ml-1">
                (optional)
              </div>
            </h3>
            <h4 className="text-text-foreground text-[10px] mb-1">
              The maximum amount that can be deposited per transaction
            </h4>
            <Input
              placeholder="Enter value"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("maxDeposit", {})}
              onChange={(e) => setMaxDeposit(BigInt(e.target.value))}
            />
          </div>

          <div className=" h-px w-full col-span-full my-3 bg-border-primary" />

          <div className="flex flex-col col-span-full">
            <h3 className="text-white text-xs mb-1">Dates</h3>
            <h4 className="text-[10px] text-text-foreground mb-1">
              Chose the period when your vault will be available for do
              deposits. (Withdraw can be done anytime since user has balance
              deposited)
            </h4>
          </div>

          {/* Start Date */}
          <div className="flex gap-2 relative">
            <div className="flex flex-col relative gap-1">
              <h3 className="text-white text-xs w-52">Start date</h3>
              <Input
                value={startDate ? formatDate(startDate) : ""}
                placeholder="00/00/0000 00:00"
                intent={"primary"}
                size={"medium"}
              />
            </div>

            <Controller
              control={control}
              name="startDate"
              render={({ field: { value, onChange } }) => (
                <div className="absolute right-8 mt-7">
                  <SelectDate
                    position="top"
                    selectedDate={value}
                    onDateChange={(date) => {
                      onChange(date);
                      setStartDate(date);
                    }}
                  />
                </div>
              )}
            />
          </div>

          {/* Start Date */}
          <div className="flex gap-2 relative">
            <div className="flex flex-col relative gap-1">
              <h3 className="text-white text-xs w-52">End date</h3>
              <Input
                value={endDate ? formatDate(endDate) : ""}
                placeholder="00/00/0000 00:00"
                intent={"primary"}
                size={"medium"}
              />
            </div>

            <Controller
              control={control}
              name="endDate"
              render={({ field: { value, onChange } }) => (
                <div className="absolute right-8 mt-7">
                  <SelectDate
                    position="top"
                    selectedDate={value}
                    onDateChange={(date) => {
                      onChange(date);
                      setEndDate(date);
                    }}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </Card>

      <div className="flex ">
        <Button
          className="mr-2.5"
          intent={"primary"}
          size="mediumLarge"
          onClick={() => {
            reset();
            setSelectedNetwork("");
            setVaultName("");
            setVaultLogo("");
            setBannerUrl("");
            setMinDeposit(BigInt(0));
            setMaxDeposit(BigInt(0));
            setStartDate(null);
            setEndDate(null);
          }}
        >
          Reset
        </Button>
        <Button
          intent={"secondary"}
          size={"mediumLarge"}
          onClick={handleSubmit(onSubmit)}
          // disabled={!isApproved}
        >
          <div
            className="size-3.5 bg-white flex justify-center items-center text-base text-accent
            rounded-full font-semibold"
          >
            +
          </div>
          <div className="text-[10px] shadow-shadow">Create Vault</div>
        </Button>
      </div>
    </div>
  );
}
