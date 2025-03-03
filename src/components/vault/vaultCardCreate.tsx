"use client";

import { useForm, Controller } from "react-hook-form";
import { Card } from "../interface/card";
import { Input } from "../interface/input";
import "react-datepicker/dist/react-datepicker.css";
import SelectDate from "../interface/datePicker";
import { abi } from "@/utils/abiContract";
import { Button } from "../interface/button";
import { readContract, simulateContract, writeContract } from "@wagmi/core";
import { wagmiConfig } from "../provider";
import { useAccount } from "wagmi";
import { erc20Abi, Hex, parseUnits } from "viem";
import { sepolia } from "viem/chains";
import { waitForTransactionReceipt } from "wagmi/actions";

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
    formState: { errors },
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
    },
  });
  const formValues = watch();

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US");
  };

  const convertTimestamp = (date: Date | null) => {
    if (!date) return 0;
    return Math.floor(date.getTime() / 1000);
  };

  const {
    assetToken,
    salt,
    minDeposit,
    maxDeposit,
    startDate,
    endDate,
    vaultName,
    vaultLogo,
    bannerUrl,
  } = formValues;

  const { isConnected } = useAccount();

  async function getTokenDecimals(tokenAddress: Hex) {
    const decimals = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "decimals",
    });
    return decimals;
  }

  async function convertParams() {
    const tokenDecimals = await getTokenDecimals(assetToken);

    const adjustedMaxDeposit = parseUnits(maxDeposit.toString(), tokenDecimals);
    const adjustedMinDeposit = parseUnits(minDeposit.toString(), tokenDecimals);

    return { adjustedMaxDeposit, adjustedMinDeposit };
  }

  async function getContract(address: Hex) {
    const name = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address,
      functionName: "name",
    });
    const symbol = await readContract(wagmiConfig, {
      abi: erc20Abi,
      address,
      functionName: "symbol",
    });
    return { name, symbol };
  }

  async function onSubmit() {
    try {
      if (!isConnected) {
        alert("Please connect your wallet");
        return;
      }
      console.log("Submitting ...");

      const { adjustedMinDeposit, adjustedMaxDeposit } = await convertParams();

      const configParams: ContractParams = {
        abi,
        address: "0x3f78066D1E2184f912F7815e30F9C0a02d3a87D3",
        functionName: "createVault",
        args: [
          assetToken,
          convertTimestamp(startDate),
          convertTimestamp(endDate),
          adjustedMinDeposit,
          adjustedMaxDeposit,
          salt,
        ],
      };

      const simulateVault = await simulateContract(wagmiConfig, configParams);

      console.log("Result of simulation:", simulateVault);

      if (simulateVault.result) {
        console.log("Simulation sucessfull! Creating a vault ...");
      }

      const tokenData = await getContract(assetToken);
      const { name: assetTokenName, symbol: assetTokenSymbol } = tokenData;

      const vaultCreate = await writeContract(wagmiConfig, configParams);

      console.log("Vault creation result:", vaultCreate);

      const tokenDecimals = await getTokenDecimals(assetToken);

      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: simulateVault.result,
          vaultName,
          vaultLogo,
          bannerUrl,
          startDate,
          endDate,
          chainId: 11155111,
          assetTokenDecimals: tokenDecimals,
          assetTokenName,
          assetTokenSymbol,
          assetTokenAddress: assetToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Sucessfull creation a vault");
      }
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
            {...register("network", { required: "Network is required" })}
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

//Exemplo de formulário de criacao de vault para se seguir

// "use client"

// import { Button, Chip, Icon, Input, Text, TextArea } from "@/ui/components"
// import { DiscordIcon, TwitterIcon } from "@/ui/components/icons"
// import { Controller, useForm } from "react-hook-form"
// import { SectionHeading, URLUploaderWithInput } from "."
// import { DiscordPattern, RoundTypes, TelegramPattern } from "../constants"
// import { IdentityPreview } from "./IdentityPreview"

// // TODO: Move this component to a proper place.
// export function ProjectDetailsForm() {
//   // Form Hook for handling form state.
//   // refer: https://react-hook-form.com/
//   const { formState, register, handleSubmit, control } = useForm({
//     defaultValues: {
//       projectName: "",
//       shortDescription: "",
//       roundType: "",
//       description: "",
//       banner: "",
//       logo: "",
//       discordLink: "",
//       telegramLink: "",
//     },
//   })

//   return (
//     <form
//       onSubmit={handleSubmit(
//         (form) => console.log(form),
//         (e) => console.log("ERROR", e),
//       )}
//       className={
//         "max-w-screen-xl w-full mx-auto [&_section]:p-6 [&_section]:sm:p-8 [&_section]:gap-3 [&_section]:sm:flex"
//       }
//       // p-6 sm:p-8 flex gap-3 w-full
//     >
//       <hr className="border-fj-blue-500" />

//       <section className="flex-wrap">
//         <div className="gap-3 flex flex-col flex-1">
//           <SectionHeading tooltipInfo="...">Project Description</SectionHeading>

//           <Input
//             label="Project Name"
//             placeholder="Fjapybara Proj"
//             {...register("projectName", { required: "Project Name is Required", maxLength: 25 })}
//             error={!!formState.errors.projectName?.message}
//           />

//           <TextArea
//             label="Short Description"
//             placeholder="Fjapybara Proj is a project that aims to create a better world for the Fjapybara species."
//             {...register("shortDescription", { required: "Project Name is Required", maxLength: 200 })}
//             error={!!formState.errors.shortDescription?.message}
//           />
//         </div>

//         <div className="gap-3 flex flex-col  lg:max-w-80 w-full">
//           <SectionHeading>Choose Round Type</SectionHeading>
//           <Controller
//             control={control}
//             name="roundType"
//             rules={{ required: "Round Type is Required" }}
//             render={({ field }) => (
//               <div className="flex flex-col gap-2">
//                 {RoundTypes.map((roundType) => (
//                   <Button
//                     value={roundType}
//                     aria-selected={field.value === roundType}
//                     onClick={() => field.onChange?.(roundType)}
//                     className="w-full justify-start capitalize shadow-black-20-indigo-500-30-inset"
//                     iconLeft={<Icon>group</Icon>}
//                     key={roundType}
//                     size="xl"
//                   >
//                     {roundType.replace("-", " ")}
//                   </Button>
//                 ))}
//               </div>
//             )}
//           />
//         </div>

//         <div className="basis-full flex flex-col gap-3 mt-4">
//           <SectionHeading>Describe Your Project</SectionHeading>
//           <TextArea
//             className="min-h-80"
//             label="Project Description"
//             placeholder="Describe your project in details"
//             {...register("description", { required: "Description is required", maxLength: 5_000 })}
//           />
//         </div>
//       </section>

//       <hr className="border-fj-blue-500" />

//       <section>
//         <IdentityPreview control={control} />
//       </section>

//       <hr className="border-fj-blue-500" />

//       <section className="max-lg:flex-col">
//         <div className="flex flex-col lg:w-2/4">
//           <SectionHeading>Brand Images</SectionHeading>
//           <Text variant="secondary">
//             Select the round type that best fits your project&apos;s current stage. Select the round type that best fits
//             your project&apos;s current stage. Learn More.
//           </Text>
//         </div>
//         <div className=" gap-2 flex flex-col lg:w-2/4">
//           <URLUploaderWithInput
//             label="Logo"
//             placeholder="https://drive.google.com/fjapybara.jpeg"
//             {...register("logo", { required: "Logo is required" })}
//           />
//           <URLUploaderWithInput
//             label="Banner"
//             placeholder="https://drive.google.com/fjapybara.jpeg"
//             {...register("banner", { required: "Banner is required" })}
//           />
//         </div>
//         {/* <div className="max-w-3xl w-full gap-3 grid lg:grid-cols-2"></div> */}
//       </section>

//       <hr className="border-fj-blue-500" />

//       <section>
//         <div className="max-w-3xl w-full gap-3 grid lg:grid-cols-2">
//           <div className="col-span-full">
//             <SectionHeading>Social and Links</SectionHeading>
//           </div>
//           <Input
//             {...register("discordLink", { pattern: { value: DiscordPattern, message: "Invalid Discord URL" } })}
//             placeholder="https://discord.gg/fjapybara"
//             label="Discord URL"
//             iconRight={<DiscordIcon className="size-6 fill-indigo-300" />}
//           />
//           <Input
//             {...register("telegramLink", { pattern: { value: TelegramPattern, message: "Invalid Telegram URK" } })}
//             placeholder="https://t.me/fjapybara"
//             label="Telegram Chat"
//             iconRight={<DiscordIcon className="size-6 fill-indigo-300" />}
//           />
//           <Button
//             size="xl"
//             iconLeft={<TwitterIcon className="size-5" />}
//             className="w-full shadow-black-20-indigo-500-30-inset"
//           >
//             Connect Twitter
//           </Button>
//           <Button size="xl" iconLeft={<Icon>add</Icon>} className="w-full">
//             Add More Links
//           </Button>
//         </div>
//       </section>

//       <hr className="border-fj-blue-500" />

//       <section className="max-md:flex-col">
//         <div className="flex flex-col gap-3 md:w-2/4">
//           <SectionHeading>Select Tags</SectionHeading>
//           <Text size="sm" variant="secondary">
//             Choose up to two tags that best describe your project&apos;s category to help potential buyers understand
//             its focus.
//           </Text>
//         </div>
//         <div className="md:w-2/4 flex flex-col gap-2">
//           <div className="bg-black-20 rounded-full border-2 gap-2 flex flex-wrap p-2 border-fj-blue-500 shadow-indigo-500-10-black-20-inset w-full">
//             <Chip variant="primary" className="px-3 py-1">
//               Gaming
//             </Chip>
//             <Chip variant="primary" className="px-3 py-1">
//               Capybara
//             </Chip>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button
//               className="shadow-black-20-indigo-500-30-inset"
//               iconRight={<Icon className="text-base ">add</Icon>}
//               size="xs"
//             >
//               Add
//             </Button>
//             <Text size="xs" variant="secondary">
//               2 / 3
//             </Text>
//           </div>
//         </div>
//       </section>

//       <hr className="border-fj-blue-500" />

//       <section className="items-center max-md:flex-col">
//         <div className="flex flex-col gap-3 md:w-2/4">
//           <Text size="xl" className="w-fit pr-2" iconRight={<Icon className="text-3xl text-indigo-300">help</Icon>}>
//             Geo-Blocked Countries
//           </Text>
//           <Text size="sm" variant="secondary">
//             Choose up to two tags that best describe your project&apos;s category to help potential buyers understand
//             its focus.
//           </Text>
//         </div>

//         <div className="w-full md:w-2/4 flex flex-col gap-2">
//           <div className="bg-black-20 rounded-3xl min-h-24 border-2 gap-2 flex flex-wrap p-2 border-fj-blue-500 shadow-indigo-500-10-black-20-inset w-full">
//             <Chip variant="primary" className="px-3 h-fit py-1">
//               Brazil
//             </Chip>
//             <Chip variant="primary" className="px-3 h-fit py-1">
//               Brazil
//             </Chip>
//           </div>

//           <div className="flex items-center gap-2">
//             <Button
//               className="shadow-black-20-indigo-500-30-inset"
//               iconRight={<Icon className="text-base ">add</Icon>}
//               size="xs"
//             >
//               Add
//             </Button>
//             <Text size="xs" variant="secondary">
//               2 / 250
//             </Text>
//           </div>
//         </div>
//       </section>

//       <hr className="border-fj-blue-500" />

//       <section className="items-center">
//         <div className="flex flex-col gap-3 md:w-2/4">
//           <Text size="xl" className="w-fit pr-2" iconRight={<Icon className="text-3xl text-indigo-300">help</Icon>}>
//             Previous Investment Rounds
//           </Text>
//           <Text size="sm" variant="secondary">
//             Provide key details about any previous investment rounds. This includes the total amount raised, the
//             valuation, token generation event (TGE) percentage, and any vesting terms.
//           </Text>
//         </div>

//         <Button className="w-fit ml-auto shadow-black-20-indigo-500-30-inset" iconLeft={<Icon>add</Icon>} size="xl">
//           Add Investment Round
//         </Button>
//       </section>

//       <hr className="border-fj-blue-500" />

//       <Button type="submit" className="w-full mt-8" size="xl">
//         Next
//       </Button>
//     </form>
//   )
// }
