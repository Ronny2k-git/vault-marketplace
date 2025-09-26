"use client";

import { APP_ROUTES } from "@/global/constants";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";

export function MenuMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="md:hidden flex items-center ml-4">
        <button className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img
            className="h-6 w-6"
            src="/icons/hamburguer.png"
            alt="Hamburguer"
          />
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute rounded-b-3xl lg:hidden top-0 right-0 p-4 z-30 flex flex-col text-red-500
         bg-background-foreground h-auto w-full"
        >
          <div className="flex flex-col ml-2">
            <div className="flex">
              <h1 className="text-[22px] mb- text-white hover:underline">
                Vault Marketplace
              </h1>
              <button
                className="flex justify-end ml-auto items-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img className="size-5" src="/icons/delete.png" alt="Close" />
              </button>
            </div>
            <div className="Line h-0.5 mt-2 mb-4 w-full bg-gray-500" />
            {APP_ROUTES.map((route) => (
              <Link href={route.path} key={route.value}>
                <Button
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl py-2 flex gap-2 my-1 text-sm w-full"
                  intent={"primary"}
                >
                  <span>{route.icon}</span>
                  {route.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
