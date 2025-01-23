"use client";

import { useForm, Controller } from "react-hook-form";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import "react-datepicker/dist/react-datepicker.css";
import SelectDate from "../interface/datePicker";

export function CardCreate() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      network: "Sepolia",
      vaultName: "",
      vaultLogo: "",
      bannerUrl: "",
      minDeposit: "",
      maxDeposit: "",
      startDate: "",
      endDate: "",
    },
  });

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US");
  };

  return (
    <div>
      <Card className="mr-2.5 mb-2.5" intent={"primary"} size={"high"}>
        <h3 className="text-white text-xs">Network</h3>
        <div className="relative">
          <select
            className="py-1 pl-5 mb-2.5 text-white px-1.5 rounded-md text-xs bg-button-bg-primary"
            {...register("network")}
          >
            <option value="Sepolia">Sepolia</option>
            <option value="Arbitrum">Arbitrum</option>
            <option value="Base">Base</option>
            <option value="Optimism">Optimism</option>
            <option value="Polygon">Polygon</option>
          </select>
          <img
            className="absolute top-1 ml-1.5 mt-0.5 size-4"
            src="/icons/iconSelect.png"
          />
        </div>
        <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary" />
        <h3 className="text-white text-xs mb-1">Vault Name</h3>
        <Input
          {...register("vaultName")}
          placeholder="Enter name"
          intent={"primary"}
          size={"mediumLarge"}
        />
        <h3 className="text-white text-xs mb-1">Vault Logo</h3>
        <h4 className="text-text-foreground text-[10px] mb-1">
          The card logo to be displayed on pages
        </h4>
        <Input
          placeholder="Enter URL"
          intent={"primary"}
          size={"mediumLarge"}
          {...register("vaultLogo")}
        />
        <h3 className="text-white text-xs mb-1">Banner Url</h3>
        <h4 className="text-text-foreground text-[10px] mb-1">
          The vault banner to be showed on pages
        </h4>
        <Input
          placeholder="Enter URL"
          intent={"primary"}
          size={"mediumLarge"}
          {...register("bannerUrl")}
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
          {...register("minDeposit")}
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
          {...register("maxDeposit")}
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
          <Input
            className="mr-3 placeholder:text-[11px]"
            placeholder="00/00/0000 00:00"
            intent={"primary"}
            size={"medium"}
            {...register("startDate")}
          />
          <Input
            className="placeholder:text-[11px]"
            placeholder="00/00/0000 00:00"
            intent={"primary"}
            size={"medium"}
            {...register("endDate")}
          />
          <div className="absolute right-[252px] mt-1.5">
            <SelectDate
              position="top"
              // selectedDate={startDate}
              // onDateChange={setStartDate}
            />
          </div>
          <div className="absolute right-12 mt-1.5">
            <SelectDate
              position="top"
              // selectedDate={endDate}
              // onDateChange={setEndDate}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
