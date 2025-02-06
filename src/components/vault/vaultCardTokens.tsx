"use client";

import { FaArrowRightLong } from "react-icons/fa6";
import { Button } from "../interface/button";
import { Card } from "../interface/card";
import Link from "next/link";
import { useEffect, useState } from "react";

type Vault = {
  id: number;
  address: string;
  name: string;
  startsAt: string;
  endsAt: string;
  banner: string;
  logo: string;
};

export function CardTokens() {
  const [vaults, setVaults] = useState<Vault[]>([]);

  async function getContract() {
    const response = await fetch("/api/getTokenAddress", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    if (data.success) {
      setVaults(data.vault[0]);
    }
  }

  useEffect(() => {
    getContract();
  }, []);

  const formatedStartDate = new Date(vaults.startsAt).toLocaleDateString(
    "en-US"
  );

  return (
    <div>
      <Card className="flex items-center" intent={"primary"} size={"long"}>
        <img className="size-7 ml-2 mr-1" src="/icons/usdcLogo.png" />
        <div className="w-[130px]">
          {vaults.name} <br /> Sepolia
        </div>
        <div className="w-[100px]">5</div>
        <div className="w-36">100,000.23 USDC</div>
        <div className="w-56">{formatedStartDate}</div>
        <Link href={`/token-vault/1`}>
          <Button intent={"primary"} size={"small"}>
            View now
            <FaArrowRightLong />
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export function TransactionTokens() {
  const [vaults, setVaults] = useState<Vault[]>([]);

  return (
    <div>
      <Card
        className="flex gap-2 text-white text-[12px]"
        intent={"primary"}
        size={"mediumLong"}
      >
        <div className="w-20 ml-2">5</div>
        <div className="w-28">0x54dF...3456</div>
        <div className="w-20">8 days ago</div>
        <div className="text-live-accent">Deposit</div>
      </Card>
    </div>
  );
}
