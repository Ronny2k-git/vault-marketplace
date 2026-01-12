"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdDateRange } from "react-icons/md";

interface SelectDateProps {
  position?: "top" | "bottom";
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  className?: string;
}

export default function DatePickerInput({
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
    <div>
      <button onClick={clickCalendar}>
        <MdDateRange className="size-5" />
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
