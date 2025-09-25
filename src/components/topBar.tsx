"use client";

import { APP_ROUTES } from "@/global/constants";
import { Tabs } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
        <Link href="/">
          <h1 className="ml-2 sm:text-[22px] mr-4 text-lg text-white">
            Vault Marketplace
          </h1>
        </Link>
        <div className="hidden md:flex ">
          <Tabs.Root
            className="flex gap-4"
            defaultValue={activeTab()}
            value={activeTab()}
          >
            {APP_ROUTES.map((route) => (
              <Tabs.List key={route.value}>
                <Tabs.Trigger value={route.value}>
                  <Link href={route.path}>
                    <h2 className="flex items-center gap-1 hover:underline text-text-foreground">
                      <span>{route.icon}</span>
                      {activeTab() === route.value && (
                        <div className="xl:hidden">{route.label}</div>
                      )}
                      <div className="max-xl:hidden">{route.label}</div>
                    </h2>
                  </Link>
                </Tabs.Trigger>
              </Tabs.List>
            ))}
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
