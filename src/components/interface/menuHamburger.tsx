"use client";

import { useState } from "react";
import { ButtonStyle } from "../connectButton";
import { Button } from "./button";
import { MdOutlineCreate } from "react-icons/md";
import { IoMdHelpCircleOutline, IoMdSearch } from "react-icons/io";
import { PiPlant } from "react-icons/pi";
import Link from "next/link";

export function MenuMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="md:hidden flex items-center ml-4">
        <button className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? (
            <img className="h-4 w-4" src="/icons/delete.png" alt="Close" />
          ) : (
            <img
              className="h-6 w-6"
              src="/icons/hamburguer.png"
              alt="Hamburguer"
            />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div
          className="absolute rounded-b-3xl md:hidden top-0 right-0 p-4 z-10 flex flex-col text-red-500
         bg-background-foreground h-[325px] w-full"
        >
          <div className="flex flex-col ml-2">
            <div className="flex">
              <h1 className="text-[22px] mb-4 text-white hover:underline">
                Vault Marketplace
              </h1>
              <button
                className="flex justify-end ml-auto items-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img
                  className="h-3 w-3 -mt-8"
                  src="/icons/delete.png"
                  alt="Close"
                />
              </button>
            </div>
            <Button
              className="rounded-xl py-2 gap-2 text-sm"
              intent={"primary"}
            >
              <ButtonStyle />
              Connect Wallet
            </Button>
            <div className="Line h-0.5 mt-4 mb-4 w-full bg-gray-500" />
            <Link href="/explore-vaults">
              <Button
                className="rounded-xl py-2 mb-2 text-sm w-full"
                intent={"primary"}
              >
                <IoMdSearch className="size-4 mt-0.5 mr-1" /> Explore Vaults
              </Button>
            </Link>
            <Link href="/create-vault-page">
              <Button
                className="rounded-xl py-2 mb-2 gap-1 text-sm w-full"
                intent={"primary"}
              >
                <MdOutlineCreate /> Create a vault
              </Button>
            </Link>
            <Button
              className="rounded-xl py-2 text-sm mb-2 gap-1 w-full"
              intent={"primary"}
            >
              <PiPlant /> Staking
            </Button>
            <Button
              className="rounded-xl py-2 text-sm gap-1 w-full"
              intent={"primary"}
            >
              <IoMdHelpCircleOutline /> Help
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
