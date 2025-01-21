"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SelectDateProps {
  position?: "top" | "bottom";
}

export default function SelectDate({ position = "bottom" }: SelectDateProps) {
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
        <div
          className={`absolute z-40 ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          <DatePicker
            className=""
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            inline
          />
        </div>
      )}
    </div>
  );
}
