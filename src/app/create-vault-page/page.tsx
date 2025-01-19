"use client";

import { Button } from "@/components/interface/button";
import { Card } from "@/components/interface/card";
import { Input } from "@/components/interface/input";
import { CardCreate } from "@/components/vault/vaultCardCreate";

export default function () {
  return (
    <div className="min-h-screen w-[calc(screen-1px)] bg-background">
      <div className="h-full w-full flex flex-col items-center">
        <h1 className="mt-11 text-3xl w-[722px]">Create a Vault</h1>
        <h2 className="text-base pb-8 w-[722px]">
          Create your own token vault.
        </h2>
        <div className="flex">
          <Card className="mr-2.5 mb-2.5" intent={"primary"} size={"high"}>
            <h3 className="text-white text-xs">Network</h3>
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
            <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary" />
            <h3 className="text-white text-xs mb-1">Vault Name</h3>
            <Input
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
            />
            <h3 className="text-white text-xs mb-1">Banner Url</h3>
            <h4 className="text-text-foreground text-[10px] mb-1">
              The vault banner to be showed on pages
            </h4>
            <Input
              placeholder="Enter URL"
              intent={"primary"}
              size={"mediumLarge"}
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
            />
            <div className="Line h-[1px] w-[439px] mb-2.5 bg-border-primary" />
            <h3 className="text-white text-xs mb-1">Dates</h3>
            <h4 className="text-[10px] text-text-foreground mb-1">
              Chose the period when your vault will be available for do
              deposits. (Withdraw can be done anytime since user has balance
              deposited)
            </h4>
            <div className="flex">
              <h3 className="text-white text-xs w-52">Start date</h3>
              <h3 className="text-white text-xs">End date</h3>
            </div>
            <div className="flex">
              <Input
                className="mr-3"
                placeholder="00/00/0000 00:00"
                intent={"primary"}
                size={"medium"}
              />
              <Input
                placeholder="00/00/0000 00:00"
                intent={"primary"}
                size={"medium"}
              />
            </div>
          </Card>
          <CardCreate />
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
            <div className="text-[10px]">Create Vault</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
