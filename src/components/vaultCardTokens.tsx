"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "./button";
import { Card } from "./card";
import Link from "next/link";

export default function CardTokens() {
  return (
    <div>
      <Card className="flex items-center" intent={"primary"} size={"long"}>
        <img className="size-7 ml-2 mr-1" src="/icons/usdcLogo.png" />
        <div className="w-[130px]">
          USDC Vault <br /> Sepolia
        </div>
        <div className="w-[100px]">5</div>
        <div className="w-32">100,000.23 USDC</div>
        <div className="w-60">01/01/2001 12:20</div>
        <Link href={`/tokenVault/1`}>
          <Button intent={"primary"} size={"small"}>
            View now
            <FaArrowRightLong />
          </Button>
        </Link>
      </Card>
    </div>
  );
}
