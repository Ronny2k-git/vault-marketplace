"use client";

import { Tabs } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { MdCalculate } from "react-icons/md";
import WalletConnect from "./WalletConnect";
import { MenuMobile } from "./interface/Drawer";

export function TopBar() {
  const pathname = usePathname();

  const activeTab = () => {
    if (pathname.startsWith("/create-vault-page")) return "create";
    if (pathname.startsWith("/calculate-mkt-cap")) return "calculate";
    if (pathname.startsWith("/create-token")) return "create-token";
    return "explore";
  };

  return (
    <div className="h-[90px] w-100% bg-background-alt font-SpaceGrotesk">
      <div className="h-full w-full flex items-center">
        <div className="size-12 ml-4 -mt-1 rounded-full bg-white" />
        <Link href="/explore-vaults">
          <h1 className="ml-2 sm:text-[22px] text-lg text-white">
            Vault Marketplace
          </h1>
        </Link>
        <div className="hidden lg:flex ">
          <Tabs.Root defaultValue={activeTab()} value={activeTab()}>
            <Tabs.List className="flex">
              <Tabs.Trigger
                className="hover:underline text-text-foreground"
                value="explore"
              >
                <Link href={`/explore-vaults`}>
                  <h2 className="flex hover:underline text-text-foreground">
                    <IoSearchOutline className="size-[18px] mt-0.5 mr-1" />{" "}
                    Explore vaults
                  </h2>
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="create">
                <Link href="/create-vault-page">
                  <h3 className="flex text-white items-center hover:underline">
                    <p className="size-3.5 bg-text-foreground flex rounded-full items-center justify-center text-sm font-semibold mr-1.5 -mt-0.5 text-black">
                      +
                    </p>
                    Create a vault
                  </h3>
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="calculate">
                <Link href="/calculate-mkt-cap">
                  <h3 className="flex text-white items-center hover:underline">
                    <MdCalculate className="size-[18px] mr-1" />
                    Calculate mkt cap
                  </h3>
                </Link>
              </Tabs.Trigger>
              <Tabs.Trigger value="create-token">
                <Link href="/create-token">
                  <h3 className="flex text-white items-center hover:underline">
                    <MdCalculate className="size-[18px] mr-1" />
                    Create ERC20 token
                  </h3>
                </Link>
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
        </div>

        <div className=" ml-auto lg:pr-4">
          <WalletConnect />
        </div>
        <div className="lg:pr-0 pr-4">
          <MenuMobile />
        </div>
      </div>
    </div>
  );
}
