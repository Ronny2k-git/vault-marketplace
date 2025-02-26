"use client";

import { useState } from "react";

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
          className="absolute rounded-3xl md:hidden top-0 right-0 p-4 z-10 flex flex-col text-red-500
         bg-background-alt h-[300px] w-full"
        >
          <div className="flex">
            <h1 className="ml-2 text-[22px] text-white">Vault Marketplace</h1>
            <button
              className="flex justify-end ml-auto items-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img className="h-4 w-4" src="/icons/delete.png" alt="Close" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
