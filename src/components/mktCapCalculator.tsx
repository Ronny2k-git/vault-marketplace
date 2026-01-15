"use client";

import { useState } from "react";
import { GiToken } from "react-icons/gi";
import { LuDollarSign } from "react-icons/lu";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { Card } from "./interface/Card";
import { Input } from "./interface/Input";

export function MktCapCalculator() {
  const [currentPrice, setCurrentPrice] = useState("");
  const [circulatingSupply, setCirculatingSupply] = useState("");
  const [tokenName, setTokenName] = useState("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const number = parseFloat(value);
    if (!isNaN(number)) {
      setCurrentPrice(number.toLocaleString("en-US"));
    } else {
      setCurrentPrice("");
    }
  };

  const handleSupplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    const number = parseFloat(value);
    if (!isNaN(number)) {
      setCirculatingSupply(number.toLocaleString("en-US"));
    } else {
      setCirculatingSupply("");
    }
  };

  const marketCap =
    parseFloat(currentPrice.replace(/,/g, "")) *
      parseFloat(circulatingSupply.replace(/,/g, "")) || 0;

  return (
    <div className="flex max-md:flex-col justify-between gap-8">
      <Card
        intent={"primary"}
        className="flex flex-col p-6 w-full rounded-xl gap-2 relative"
      >
        {/* Token Name */}
        <h3 className="text-white">Token name</h3>
        <Input
          className="h-10 rounded-lg px-8 focus:outline-none"
          placeholder="Ex: 1.20"
          type="text"
          onChange={(e) => setTokenName(e.target.value)}
          iconLeft={
            <MdOutlineDriveFileRenameOutline className="size-6 text-gray-300" />
          }
          value={tokenName}
          size="mediumLarge"
          intent={"primary"}
        />

        {/* Token Current Price */}
        <h3 className="text-white">Token Current price $</h3>
        <Input
          className="h-10 rounded-lg px-8 focus:outline-none"
          placeholder="Ex: 1.20"
          value={currentPrice}
          onChange={handlePriceChange}
          iconLeft={<LuDollarSign className="size-6 text-gray-300" />}
          size="mediumLarge"
          intent={"primary"}
        />

        {/* Token Circulating Supply */}
        <h3 className="text-white">Token circulating supply</h3>

        <Input
          className="h-10 rounded-lg px-8 focus:outline-none"
          placeholder="Ex: 1,000,000"
          value={circulatingSupply}
          onChange={handleSupplyChange}
          iconLeft={<GiToken className="size-6 text-gray-300" />}
          size="mediumLarge"
          intent={"primary"}
        />

        {/* Result of the calculation */}
        <h3 className="flex flex-wrap gap-1 text-white">
          The
          <p className="text-green-500 underline">
            {tokenName || "token name"}
          </p>
          market cap is:
        </h3>

        <div className="h-12 text-green-500 flex justify-center items-center bg-gray-900 rounded-lg px-5">
          {`$ ${marketCap.toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}`}
        </div>
      </Card>

      <img
        alt="Token banner"
        className="max-md:w-full max-md:aspect-video md:h-72 w-[20rem] rounded-xl"
        src="bannercripto.jpg"
      />
    </div>
  );
}
