"use client";

import { useForm, Controller } from "react-hook-form";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import "react-datepicker/dist/react-datepicker.css";
import SelectDate from "../interface/datePicker";
import { abi } from "@/utils/abiContract";
import { Button } from "../interface/button";
import {
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { wagmiConfig } from "../provider";
import { useAccount } from "wagmi";

type ContractParams = {
  abi: any;
  address: `0x${string}`;
  functionName: string;
  args: any[];
};

export function CardCreate() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      network: "Sepolia",
      vaultName: "",
      vaultLogo: "",
      bannerUrl: "",
      assetToken: "" as `0x${string}`,
      salt: 0,
      minDeposit: BigInt(""),
      maxDeposit: BigInt(""),
      startDate: null,
      endDate: null,
      isApproved: false,
    },
  });

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US");
  };

  const formValues = watch();

  const {
    vaultName,
    vaultLogo,
    bannerUrl,
    assetToken,
    salt,
    minDeposit,
    maxDeposit,
    startDate,
    endDate,
    isApproved,
  } = formValues;

  const convertTimestamp = (date: Date | null) => {
    if (!date) return 0;
    return Math.floor(date.getTime() / 1000);
  };

  const { isConnected } = useAccount();

  // const handleApproveToken = async () => {
  //   async function approveToken(spenderAddress: Hex, amount: bigint) {
  //     const tx = await writeContract(wagmiConfig, {
  //       abi: erc20Abi,
  //       address: "0xfAb19e8992B0564ab99F7c0098979595124f0Bc3", //Token tUSDT
  //       functionName: "approve",
  //       chainId: sepolia.id,
  //       args: [spenderAddress, amount],
  //     });
  //     return tx;
  //   }

  //   if (!isConnected) {
  //     alert("Please connect your wallet");
  //     return;
  //   }
  //   try {
  //     const parsedAmount = parseUnits(minDeposit.toString(), 18);
  //     const approveTxHash = await approveToken(
  //       "0x3f78066D1E2184f912F7815e30F9C0a02d3a87D3", //Vault Contract
  //       parsedAmount
  //     );

  //     console.log("Token approval transaction hash:", approveTxHash);
  //     setValue("isApproved", true);

  //     alert("Token approval successful!");
  //   } catch (error) {
  //     console.error("Error in transaction");
  //     alert("Token approval failed!");
  //   }
  // };

  async function onSubmit() {
    const configParams: ContractParams = {
      abi,
      address: "0x3f78066D1E2184f912F7815e30F9C0a02d3a87D3",
      functionName: "createVault",
      args: [
        assetToken,
        convertTimestamp(startDate),
        convertTimestamp(endDate),
        minDeposit,
        maxDeposit,
        salt,
      ],
    };

    try {
      if (!isConnected) {
        alert("Please connect your wallet");
        return;
      }
      console.log("Submitting ...");

      const simulateVault = await simulateContract(wagmiConfig, configParams);

      console.log("Result of simulation:", simulateVault);

      if (simulateVault.result) {
        console.log("Simulation sucessfull! Creating a vault ...");
      }

      const vaultCreate = await writeContract(wagmiConfig, configParams);

      alert("Sucessfull creation a vault");
      return vaultCreate;
    } catch (error) {
      alert("Error in the creation of a vault");
    }
  }

  return (
    <div className="relative">
      <Card className="mr-2.5 mb-2.5 " intent={"primary"} size={"high"}>
        <h3 className="text-white text-xs">Network</h3>
        <div className="relative">
          <select
            className="py-1 pl-5 mb-2.5 text-white px-1.5 rounded-md text-xs bg-button-bg-primary"
            {...register("network", { required: "NEtwork is required" })}
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
        <div className="flex">
          <h3 className="text-white text-xs mb-1">Vault Name</h3>
          {errors.vaultName && (
            <p className="text-red-500 text-[11px] ml-2 text-semibold ">
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
            pattern: {
              value: /^0x[a-fA-F0-9]{40}$/,
              message: "Invalid address format",
            },
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
                    onDateChange={(date) => onChange(date)}
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
                    onDateChange={(date) => onChange(date)}
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
          onClick={() => reset()}
        >
          Reset
        </Button>
        {/* <Button
          className="mr-2"
          intent={"secondary"}
          size={"mediumLarge"}
          onClick={handleApproveToken}
        >
          <div
            className="size-3.5 bg-white flex justify-center items-center text-base text-accent
            rounded-full font-semibold"
          >
            +
          </div>
          <div className="text-[10px]">Approve Token</div>
        </Button> */}
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
          <div className="text-[10px]">Create Vault</div>
        </Button>
      </div>
    </div>
  );
}
