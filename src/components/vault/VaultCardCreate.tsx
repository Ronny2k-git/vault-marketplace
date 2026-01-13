"use client";

import { FormValues } from "@/global/types";
import { Controller, UseFormReturn } from "react-hook-form";
import { Card } from "../interface/Card";
import DatePickerInput from "../interface/DatePickerInput";
import { Input } from "../interface/input";

type CardCreateProps = {
  form: UseFormReturn<FormValues>;
};

export function VaultCardCreate({ form }: CardCreateProps) {
  // Form validation
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = form;

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US");
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <Card
      className="flex flex-col gap-4 w-full"
      intent={"primary"}
      size={"extrahigh"}
    >
      {/* ================= BASIC INFO ================= */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-indigo-200">
          Basic Information
        </h3>

        <div className="grid sm:grid-cols-2 gap-y-6 gap-x-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm">Network</h3>

            <div className="relative">
              <select
                className={`h-11 sm:w-full px-8 pl-10 text-white rounded-xl text-sm bg-button-bg-primary`}
                defaultValue=""
                {...register("network", { required: "Network is required" })}
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
                className="absolute top-2 left-3 size-6"
                src="/icons/iconSelect.png"
              />
            </div>

            {errors.network && (
              <p className="text-red-500 text-xs text-semibold ">
                {errors.network.message}
              </p>
            )}
          </div>
          {/* Vault Name */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm">Vault Name</h3>

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
            />

            {errors.vaultName && (
              <p className="text-red-500 text-xs text-semibold">
                {errors.vaultName.message}
              </p>
            )}
          </div>
          {/* Vault Logo */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm">Vault Logo</h3>

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
            />

            {errors.vaultLogo && (
              <p className="text-red-500 text-xs text-semibold ">
                {errors.vaultLogo.message}
              </p>
            )}
          </div>
          {/* Banner Url */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm">Banner URL</h3>

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
            />

            {errors.bannerUrl && (
              <p className="text-red-500 text-xs text-semibold ">
                {errors.bannerUrl.message}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className=" h-px w-full col-span-full my-3 bg-border-primary" />

          <h3 className="text-base font-semibold text-indigo-200 col-span-full">
            Token & Deposit Rules
          </h3>

          {/* Salt Token */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm">Salt</h3>
            <Input
              placeholder="Enter salt (unique value)"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("salt", { required: true, valueAsNumber: true })}
            />
          </div>

          {/* Asset Token */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm">Asset Token</h3>

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

            {errors.assetToken && (
              <p className="text-red-500 text-xs text-semibold ">
                {errors.assetToken.message}
              </p>
            )}
          </div>

          {/* Min Deposit */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm flex">
              Minimum Deposit per wallet
              <div className="text-[10px] text-text-foreground ml-1">
                (optional)
              </div>
            </h3>
            <h4 className="text-text-foreground text-[10px]">
              The minimum amount that can be deposited per transaction
            </h4>
            <Input
              placeholder="Enter value"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("minDeposit", {})}
            />
          </div>
          {/* Max Deposit */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white text-sm flex">
              Maximum Deposit per wallet
              <div className="text-[10px] text-text-foreground ml-1">
                (optional)
              </div>
            </h3>
            <h4 className="text-text-foreground text-[10px]">
              The maximum amount that can be deposited per transaction
            </h4>
            <Input
              placeholder="Enter value"
              intent={"primary"}
              size={"mediumLarge"}
              {...register("maxDeposit", {})}
            />
          </div>

          {/* Divider */}
          <div className=" h-px w-full col-span-full my-3 bg-border-primary" />

          <div className="flex flex-col col-span-full">
            <h3 className=" text-base font-semibold text-indigo-200"> Dates</h3>
            <h4 className="text-[10px] text-text-foreground">
              Chose the period when your vault will be available for do
              deposits. (Withdraw can be done anytime since user has balance
              deposited)
            </h4>
          </div>

          {/* Start Date */}
          <div className="flex flex-col relative gap-2">
            <h3 className="text-white text-sm">Start date</h3>
            <Input
              value={startDate ? formatDate(startDate) : ""}
              placeholder="00/00/0000 00:00"
              intent={"primary"}
              size={"mediumLarge"}
            />

            {errors.network && (
              <p className="text-red-500 text-xs text-semibold">
                {errors.network.message}
              </p>
            )}

            <Controller
              control={control}
              name="startDate"
              render={({ field: { value, onChange } }) => (
                <div className="absolute right-4 mt-9">
                  <DatePickerInput
                    position="top"
                    selectedDate={value}
                    onDateChange={onChange}
                  />
                </div>
              )}
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col relative gap-2">
            <h3 className="text-white text-sm">End date</h3>
            <Input
              value={endDate ? formatDate(endDate) : ""}
              placeholder="00/00/0000 00:00"
              intent={"primary"}
              size={"mediumLarge"}
            />

            {errors.network && (
              <p className="text-red-500 text-xs text-semibold">
                {errors.network.message}
              </p>
            )}

            <Controller
              control={control}
              name="endDate"
              render={({ field: { value, onChange } }) => (
                <div className="absolute right-4 mt-9">
                  <DatePickerInput
                    position="top"
                    selectedDate={value}
                    onDateChange={onChange}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </section>
    </Card>
  );
}
