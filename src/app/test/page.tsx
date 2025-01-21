"use client";

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
    </div>
  );
}
