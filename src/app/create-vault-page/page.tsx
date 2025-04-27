"use client";

import { CreateVaultEvm } from "@/components/vault/createVaultEvm";
import { CardCreate } from "@/components/vault/vaultCardCreate";
import { CardPreview } from "@/components/vault/vaultCardPreview";
import { useAccount } from "wagmi";

export default function PageCreate() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen w-[calc(screen-1px)] bg-background">
      <div className="h-full w-full flex flex-col items-center">
        <h1 className="mt-11 text-3xl w-[800px] text-white">Create a Vault</h1>
        <h2 className="text-base pb-8 w-[800px] text-text-foreground">
          Create your own token vault.
        </h2>
        <div className="flex">
          <CardCreate
            onSubmit={async (formValues) => {
              if (formValues.network === "Sepolia") {
                await CreateVaultEvm(formValues, isConnected);
              } else if (formValues.network === "Solana") {
                await console.log("Solana not yet implemented");
              }
            }}
          />
          <CardPreview />
        </div>
      </div>
    </div>
  );
}
