"use client";

import { Card } from "@/components/interface/card";
import { Input } from "@/components/interface/input";

export default function () {
  return (
    <div className="h-screen w-[calc(screen-1px)] bg-background">
      <div className="h-full w-full flex flex-col items-center">
        <h1 className="mt-11 text-3xl w-[722px]">Create a Vault</h1>
        <h2 className="text-base pb-8 w-[722px]">
          Create your own token vault.
        </h2>
        <div className="flex">
          <Card className="mr-2.5" intent={"primary"} size={"high"}>
            <h1 className="text-white text-xs">Network</h1>
            <div className="relative">
              <select className="py-1 pl-5 mb-2.5 text-white px-1.5 rounded-md text-xs bg-button-bg-primary">
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
            <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary"></div>
            <h2 className="text-white text-xs mb-1">Vault Name</h2>
            <Input
              placeholder="Enter name"
              intent={"primary"}
              size={"mediumLarge"}
            />
            <h3 className="text-white text-xs mb-1">Vault Logo</h3>
            <div className="text-text-foreground text-[11px] mb-1">
              The card logo to be displayed on pages
            </div>
            <Input
              placeholder="Enter URL"
              intent={"primary"}
              size={"mediumLarge"}
            />
            <h4 className="text-white text-xs mb-1">Banner Url</h4>
            <div className="text-text-foreground text-[11px] mb-1">
              The vault banner to be showed on pages
            </div>
            <Input
              placeholder="Enter URL"
              intent={"primary"}
              size={"mediumLarge"}
            />
            <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary"></div>
            <h5 className="text-white text-xs mb-1 flex">
              Minimum Deposit per wallet{" "}
              <div className="text-[11px] text-text-foreground ml-1">
                (optional)
              </div>
            </h5>
            <div className="text-text-foreground text-[11px] mb-1">
              The minimum amount that can be deposited per transaction
            </div>
            <Input
              placeholder="Enter value"
              intent={"primary"}
              size={"mediumLarge"}
            />
            <h6 className="text-white text-xs mb-1 flex">
              Maximum Deposit per wallet
              <div className="text-[11px] text-text-foreground ml-1">
                (optional)
              </div>
            </h6>
            <div className="text-text-foreground text-[11px] mb-1">
              The maximum amount that can be deposited per transaction
            </div>
            <Input
              placeholder="Enter value"
              intent={"primary"}
              size={"mediumLarge"}
            />
            <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary"></div>
          </Card>
          <Card intent={"primary"} size={"small"}></Card>
        </div>
        TESTTTTTTTTTT
      </div>
    </div>
  );
}
