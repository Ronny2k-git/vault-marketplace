"use client";

import { APP_ROUTES } from "@/global/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WalletConnect from "./WalletConnection";
import { MenuMobile } from "./interface/MenuMobile";

export function TopBar() {
  const pathname = usePathname();

  const activeTab = () => {
    if (pathname.startsWith("/create-vault-page")) return "create";
    if (pathname.startsWith("/calculate-mkt-cap")) return "calculate";
    if (pathname.startsWith("/create-token")) return "create-token";
    return "explore";
  };

  return (
    <div className="max-md:h-20 w-full bg-background-alt font-SpaceGrotesk">
      <div className="h-full w-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="flex items-center gap-2 lg:mr-4">
            <img
              alt="website-logo"
              className="size-12 rounded-full border-2 border-gray-800"
              src={"/website-logo.jpg"}
            />

            <Link href="/">
              <h1 className="ml- sm:text-2xl mr-4 text-lg text-white">
                Vault Marketplace
              </h1>
            </Link>
          </div>

          {/* App Routes */}
          <div className="max-md:hidden flex gap-4 max-xl:gap-8 items-center text-text-foreground">
            {APP_ROUTES.map((route) => (
              <Link
                className={`px-2 py-8 ${
                  activeTab() === route.value
                    ? "border-b-2 border-b-gray-400"
                    : ""
                } hover:bg-gray-800/20`}
                key={route.path}
                href={route.path}
              >
                <div className="flex gap-2">
                  <span>{route.icon}</span>
                  {activeTab() === route.value && (
                    <div className="xl:hidden">{route.label}</div>
                  )}
                  <div className="max-xl:hidden">{route.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center max-md:gap-4">
          <WalletConnect />

          <MenuMobile />
        </div>
      </div>
    </div>
  );
}
