"use client";

import { CreateVaultSolana } from "@/components/createVaultSolana";
import { CreateVaultEvm } from "@/components/vault/createVaultEvm";
import { CardCreate } from "@/components/vault/vaultCardCreate";
import { CardPreview } from "@/components/vault/vaultCardPreview";
import { EVM_NETWORKS } from "@/utils/networks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAccount } from "wagmi";

export default function PageCreate() {
  const { isConnected } = useAccount();
  const wallet = useWallet();

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
              if (EVM_NETWORKS.includes(formValues.network)) {
                await CreateVaultEvm(formValues, isConnected);
              } else if (formValues.network === "Solana") {
                if (!wallet) {
                  console.error("wallet not connected");
                  return;
                }
                await CreateVaultSolana(formValues, wallet);
              }
            }}
          />
          <CardPreview />
        </div>
      </div>
    </div>
  );
}
