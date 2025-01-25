"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface SelectDateProps {
  position?: "top" | "bottom";
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export default function SelectDate({
  position = "bottom",
  selectedDate,
  onDateChange,
}: SelectDateProps) {
  const [showCalendar, setShowCalendar] = useState(false);

  const clickCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
    setShowCalendar(false);
  };

  return (
    <div className="Absolute text-[10px]">
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
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            dateFormat={"MM/dd/yyyy"}
          />
        </div>
      )}
    </div>
  );
}
