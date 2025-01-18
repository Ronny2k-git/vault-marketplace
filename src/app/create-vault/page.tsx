"use client";

import { Card } from "@/components/interface/card";

export default function () {
  return (
    <div className="h-screen w-[calc(screen-1px)] bg-background">
      <div className="h-full w-full flex flex-col items-center">
        <h1 className="mt-11 text-3xl w-[722px]">Create a Vault</h1>
        <h2 className="text-base pb-8 w-[722px]">
          Create your own token vault.
        </h2>
        <div className="flex">
          <Card className="mr-2.5" intent={"primary"} size={"high"}></Card>
          <Card intent={"primary"} size={"small"}></Card>
        </div>
      </div>
    </div>
  );
}
