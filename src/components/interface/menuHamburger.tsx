"use client";

import { useState } from "react";
import { ButtonStyle } from "../connectButton";
import { Button } from "./button";
import { FaWallet } from "react-icons/fa";

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
         bg-background-foreground h-[300px] w-full"
        >
          <div className="flex flex-col ml-2">
            <div className="flex">
              <h1 className="text-[22px] mb-4 text-white">Vault Marketplace</h1>
              <button
                className="flex justify-end ml-auto items-center"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img
                  className="h-4 w-4 -mt-8 "
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
            <Button className="rounded-xl py-2 mb-2 text-sm" intent={"primary"}>
              Explore Vaults
            </Button>
            <Button className="rounded-xl py-2 mb-2 text-sm" intent={"primary"}>
              Create a vault
            </Button>
            <Button className="rounded-xl py-2 text-sm" intent={"primary"}>
              Help
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
