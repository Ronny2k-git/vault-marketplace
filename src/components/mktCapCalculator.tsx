"use client";

import { useState } from "react";
import { LuDollarSign } from "react-icons/lu";
import { GiToken } from "react-icons/gi";

export function MktCapCalculator() {
  const [currentPrice, setCurrentPrice] = useState("");
  const [circulatingSupply, setCirculatingSupply] = useState("");

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
    <div className="flex justify-between">
      <div className="flex flex-col gap-2 relative">
        <h3 className="text-white">Token Current price $</h3>
        <LuDollarSign className="size-5 absolute mt-9 ml-2" color="white" />
        <input
          className="h-8 max-w-md bg-gray-400 rounded-lg px-8 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Ex: 1.20"
          value={currentPrice}
          onChange={handlePriceChange}
        />

        <h3 className="text-white">Token circulating supply</h3>
        <GiToken className="size-5 absolute mt-28 ml-2" color="white" />
        <input
          className="h-8 max-w-md bg-gray-400 rounded-lg px-8 focus:outline-none focus:ring-2 focus:ring-gray-200"
          placeholder="Ex: 1,000,000"
          value={circulatingSupply}
          onChange={handleSupplyChange}
        />
        <h3 className="text-white">Then its market cap is:</h3>
        <div className="h-12 max-w-md text-green-500 flex justify-center items-center bg-gray-900 rounded-lg px-5">
          {`$ ${marketCap.toLocaleString("en-US", {
            maximumFractionDigits: 2,
          })}`}
        </div>
      </div>
      <img className="w-[300px] h-60" src="bannercripto.jpg" />
    </div>
  );
}
