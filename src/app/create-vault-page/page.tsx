"use client";

import { Button } from "@/components/interface/button";
import { VaultCardCreate } from "@/components/vault/vaultCardCreate";
import { CardPreview } from "@/components/vault/vaultCardPreview";
import { CreateVaultEvm } from "@/global/functions/CreateVaultEvm";
import { FormValues } from "@/global/types";
import { createVaultAtom } from "@/utils/atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import { useAccount } from "wagmi";

export default function VaultCreationPage() {
  const { isConnected } = useAccount();

  // Create Vault Atom
  const [, setCreateVault] = useAtom(createVaultAtom);

  const form = useForm<FormValues>({
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

  const { handleSubmit, reset } = form;
  const values = useWatch<FormValues>({ control: form.control });

  useEffect(() => {
    setCreateVault(values);
  }, [values, setCreateVault]);

  return (
    <div className="flex flex-col min-h-screen px-4 py-20 w-full items-center justify-center bg-background">
      {/* Title and Subtitle */}
      <div className="flex flex-col max-w-5xl gap-6">
        <div className="">
          <h1 className="text-3xl text-white">Create a Vault</h1>
          <h2 className="text-base text-text-foreground">
            Create your own token vault.
          </h2>
        </div>

        {/* Vault Cards */}
        <div className="flex max-[850px]:flex-col gap-4">
          <VaultCardCreate form={form} />

          <CardPreview />
        </div>

        <div className="flex gap-3 max-w-md">
          <Button
            className="w-full"
            intent={"primary"}
            size="mediumLarge"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </Button>
          <Button
            className="w-full"
            intent={"secondary"}
            size={"mediumLarge"}
            onClick={handleSubmit((formValues) => {
              CreateVaultEvm(formValues, isConnected);
            })}
            // disabled={!isApproved}
          >
            <FaPlusCircle className="size-4" />
            Create Vault
          </Button>
        </div>
      </div>
    </div>
  );
}
