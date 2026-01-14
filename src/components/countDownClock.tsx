"use client";

import { VaultFromDb } from "@/app/api/getTokenAddress/prisma";
import { getStatus } from "@/global/utils";
import { useCallback, useEffect, useState } from "react";

export function CountDownClock({ vault }: { vault: VaultFromDb }) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const calculateTimeLeft = useCallback(() => {
    const currentDate = new Date();
    const startDate = new Date(vault.startsAt);
    const endDate = new Date(vault.endsAt);

    if (!vault) return;

    if (getStatus(vault) === "Coming") {
      setTimeLeft(startDate.getTime() - currentDate.getTime());
    } else if (getStatus(vault) === "Live") {
      setTimeLeft(endDate.getTime() - currentDate.getTime());
    } else {
      setTimeLeft(0);
    }
  }, [vault]);

  const days = Math.max(Math.floor(timeLeft / 1000 / 60 / 60 / 24), 0);
  const hours = Math.max(Math.floor(timeLeft / 1000 / 60 / 60) % 24, 0);
  const minutes = Math.max(Math.floor(timeLeft / 1000 / 60) % 60, 0);
  const seconds = Math.max(Math.floor((timeLeft / 1000) % 60), 0);

  //The padStart() is used to add characters to the left of a string until it reaches a specified length

  const twoDigits = (n: number) => n.toString().padStart(2, "0");

  useEffect(() => {
    const interval = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  return (
    <div className="flex flex-col ml-12">
      <div className="flex max-sm:flex-col gap-2 sm:gap-6 justify-between sm:items-center"></div>
      <div className="flex text-live-accent text-base">
        <div className="flex flex-col items-center mr-1">
          <span>{twoDigits(days)}</span>
          <span className="text-white text-xs">
            {days <= 1 ? "day" : "days"}
          </span>
        </div>
        <span>/</span>
        <div className="flex flex-col items-center">
          <span>{twoDigits(hours)}</span>
          <span className="text-white text-xs">hour</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{twoDigits(minutes)}</span>
          <span className="text-white text-xs">min</span>
        </div>
        <span>:</span>

        <div className="flex flex-col items-center">
          <span>{twoDigits(seconds)}</span>
          <span className="text-white text-xs">sec</span>
        </div>
      </div>
    </div>
  );
}
