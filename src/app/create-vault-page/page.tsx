"use client";

import { VaultCardCreate } from "@/components/vault/vaultCardCreate";
import { CardPreview } from "@/components/vault/vaultCardPreview";
import { CreateVaultEvm } from "@/global/functions/CreateVaultEvm";
import { useAccount } from "wagmi";

export default function PageCreate() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-background">
      {/* Title and Subtitle */}
      <div className="flex flex-col max-w-4xl">
        <div className="">
          <h1 className="mt-11 text-3xl text-white">Create a Vault</h1>
          <h2 className="text-base pb-8 text-text-foreground">
            Create your own token vault.
          </h2>
        </div>

        {/* Vault Cards */}
        <div className="flex gap-4">
          <VaultCardCreate
            onSubmit={(formValues) => CreateVaultEvm(formValues, isConnected)}
          />
          <CardPreview />
        </div>
      </div>
    </div>
  );
}
