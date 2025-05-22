"use client";

import { useState } from "react";
import { LuDollarSign } from "react-icons/lu";
import { GiToken } from "react-icons/gi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { CardPreview } from "./vault/vaultCardPreview";
import { TbNumber16Small } from "react-icons/tb";

export function CreateErc20Token() {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2 relative">
        <h3 className="text-white">Token name</h3>
        <MdOutlineDriveFileRenameOutline
          className="size-5 absolute mt-9 ml-2"
          color="white"
        />
        <input
          className="h-8 max-w-md bg-gray-400 rounded-lg px-8 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Ex: 1.20"
          type="text"
        />
        <h3 className="text-white">Token symbol</h3>
        <LuDollarSign
          className="size-5 absolute mt-[108px] ml-2"
          color="white"
        />
        <input
          className="h-8 max-w-md bg-gray-400 rounded-lg px-8 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Ex: 1.20"
        />

        <h3 className="text-white">Token total supply</h3>
        <GiToken className="size-5 absolute mt-[183px] ml-2" color="white" />
        <input
          className="h-8 max-w-md bg-gray-400 rounded-lg px-8 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Ex: 1,000,000"
        />
        <h3 className="flex items-center gap-2 text-white">
          Token decimals
          <span className="text-gray-500 text-sm">
            (Number of decimal places for the token)
          </span>
        </h3>
        <TbNumber16Small className="size-8 absolute mt-[248px]" color="white" />
        <input
          className="h-8 max-w-md bg-gray-400 rounded-lg px-8 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Ex: 1,000,000"
        />
      </div>
      <CardPreview />
    </div>
  );
}
