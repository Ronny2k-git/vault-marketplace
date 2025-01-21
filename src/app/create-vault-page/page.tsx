"use client";

import { Button } from "@/components/interface/button";
import { CardCreate } from "@/components/vault/vaultCardCreate";
import { CardPreview } from "@/components/vault/vaultCardPreview";

export default function () {
  return (
    <div className="min-h-screen w-[calc(screen-1px)] bg-background">
      <div className="h-full w-full flex flex-col items-center">
        <h1 className="mt-11 text-3xl w-[722px]">Create a Vault</h1>
        <h2 className="text-base pb-8 w-[722px]">
          Create your own token vault.
        </h2>
        <div className="flex">
          <CardCreate />
          <CardPreview />
        </div>
        <div className="flex w-[730px] mb-11">
          <Button className="mr-2.5" intent={"primary"} size="mediumLarge">
            Reset
          </Button>
          <Button intent={"secondary"} size={"mediumLarge"}>
            <div
              className="size-3.5 bg-white flex justify-center items-center text-base text-accent 
            rounded-full font-semibold"
            >
              +
            </div>
            <div className="text-[10px] ">Create Vault</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
