"use client";

import { Card } from "@/components/interface/card";
import { CardDeposit } from "@/components/vault/vaultCardDeposit";
import { CardRemove } from "@/components/vault/vaultCardRemove";
import { Box, Tabs, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Test() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const clickCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className="Absolute">
      <button onClick={clickCalendar}>
        <img src="/icons/calendar.png" />
      </button>
      {showCalendar && (
        <DatePicker
          className="text-black bg-red-500 mr-10"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline
        />
      )}
      <Card className="flex flex-col" intent={"primary"} size={"medium"}>
        <Tabs.Root defaultValue="Deposit">
          <Tabs.List size="1" className="w-full flex justify-center">
            <Tabs.Trigger value="Deposit">Deposit</Tabs.Trigger>
            <Tabs.Trigger value="Withdraw">Withdraw</Tabs.Trigger>
          </Tabs.List>
          {""}
          <Tabs.Content value="Deposit">
            <CardDeposit />
          </Tabs.Content>
          {""}
          <Tabs.Content value="Withdraw">
            <CardRemove />
          </Tabs.Content>
        </Tabs.Root>
      </Card>
    </div>
  );
}
