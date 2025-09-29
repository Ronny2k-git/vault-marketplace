"use client";

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
import SelectDate from "../interface/datePicker";
import { Input } from "../interface/input";

export type ContractParams = {
  abi: any;
  address: `0x${string}`;
  functionName: string;
  args: any[];
};

export type FormValues = {
  network: string;
  vaultName: string;
  vaultLogo: string;
  bannerUrl: string;
  assetToken: `0x${string}`;
  salt: number;
  minDeposit: bigint;
  maxDeposit: bigint;
  startDate: Date | null;
  endDate: Date | null;
};

type CardCreateProps = {
  onSubmit: (data: FormValues) => Promise<void>;
};

export function CardCreate({ onSubmit }: CardCreateProps) {
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
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      network: "",
      vaultName: "",
      vaultLogo: "",
      bannerUrl: "",
      assetToken: "" as `0x${string}`,
      salt: 0,
      minDeposit: BigInt(""),
      maxDeposit: BigInt(""),
      startDate: null,
      endDate: null,
    },
  });

  // const formValues = watch(); This is not being used in the current code.

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US");
  };

  return (
    <div className="relative">
      <Card className="mr-2.5 mb-2.5 " intent={"primary"} size={"extrahigh"}>
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
            className={`py-1 pl-5 mb-2.5 text-white px-1.5 rounded-md text-xs bg-button-bg-primary
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
            className="absolute top-1 ml-1.5 mt-0.5 size-4"
            src="/icons/iconSelect.png"
          />
        </div>
        <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary" />
        <div className="flex">
          <h3 className="text-white text-xs mb-1">Vault Name</h3>
          {errors.vaultName && (
            <p className="text-red-500 text-[11px] ml-2 text-semibold">
              {errors.vaultName.message}
            </p>
          )}
        </div>
        <Input
          {...register("vaultName", {
            required: { value: true, message: "The vault name is required" },
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
        <div className="flex">
          <h3 className="text-white text-xs mb-1">Vault Logo</h3>
          {errors.vaultLogo && (
            <p className="text-red-500 text-[11px] ml-2 text-semibold ">
              {errors.vaultLogo.message}
            </p>
          )}
        </div>
        <h4 className="text-text-foreground text-[10px] mb-1">
          The card logo to be displayed on pages
        </h4>
        <Input
          placeholder="Enter URL"
          intent={"primary"}
          size={"mediumLarge"}
          {...register("vaultLogo", {
            required: { value: true, message: "The vault logo is required" },
            pattern: {
              value:
                /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
              message: "Invalid format URL",
            },
          })}
          onChange={(e) => setVaultLogo(e.target.value)}
        />
        <div className="flex">
          <h3 className="text-white text-xs mb-1">Banner URL</h3>
          {errors.bannerUrl && (
            <p className="text-red-500 text-[11px] ml-2 text-semibold ">
              {errors.bannerUrl.message}
            </p>
          )}
        </div>
        <h4 className="text-text-foreground text-[10px] mb-1">
          The vault banner to be showed on pages
        </h4>
        <Input
          placeholder="Enter URL"
          intent={"primary"}
          size={"mediumLarge"}
          {...register("bannerUrl", {
            required: { value: true, message: "The vault banner is required" },
            pattern: {
              value:
                /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
              message: "Invalid format URL",
            },
          })}
          onChange={(e) => setBannerUrl(e.target.value)}
        />
        <div className="flex">
          <h3 className="text-white text-xs mb-1">Asset Token</h3>
          {errors.assetToken && (
            <p className="text-red-500 text-[11px] ml-2 text-semibold ">
              {errors.assetToken.message}
            </p>
          )}
        </div>
        <Input
          placeholder="Enter address"
          intent={"primary"}
          size={"mediumLarge"}
          {...register("assetToken", {
            required: { value: true, message: "The token address is required" },
            // pattern: {
            //   value: /^0x[a-fA-F0-9]{40}$/,
            //   message: "Invalid address format",
            // },
          })}
        />
        <h3 className="text-white text-xs mb-1">Salt</h3>
        <Input
          placeholder="Enter salt (unique value)"
          intent={"primary"}
          size={"mediumLarge"}
          {...register("salt", { required: true, valueAsNumber: true })}
        />
        <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary" />
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
        <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary" />
        <h3 className="text-white text-xs mb-1">Dates</h3>
        <h4 className="text-[10px] text-text-foreground mb-1">
          Chose the period when your vault will be available for do deposits.
          (Withdraw can be done anytime since user has balance deposited)
        </h4>
        <div className="flex">
          <h3 className="text-white text-xs w-52">Start date</h3>
          <h3 className="text-white text-xs">End date</h3>
        </div>
        <div className="flex relative">
          <Controller
            control={control}
            name="startDate"
            render={({ field: { value, onChange } }) => (
              <div className="mr-3">
                <Input
                  value={value ? formatDate(value) : ""}
                  onChange={() => {}}
                  placeholder="00/00/0000 00:00"
                  intent={"primary"}
                  size={"medium"}
                />
                <div className="absolute left-44  -mt-5">
                  <SelectDate
                    position="top"
                    selectedDate={value}
                    onDateChange={(date) => {
                      onChange(date);
                      setStartDate(date);
                    }}
                  />
                </div>
              </div>
            )}
          />
          <Controller
            control={control}
            name="endDate"
            render={({ field: { value, onChange } }) => (
              <div>
                <Input
                  value={value ? formatDate(value) : ""}
                  onChange={() => {}}
                  placeholder="00/00/0000 00:00"
                  intent={"primary"}
                  size={"medium"}
                />
                <div className="absolute right-12 -mt-5">
                  <SelectDate
                    position="top"
                    selectedDate={value}
                    onDateChange={(date) => {
                      onChange(date);
                      setEndDate(date);
                    }}
                  />
                </div>
              </div>
            )}
          />
        </div>
      </Card>
      <div className="flex mb-11">
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
