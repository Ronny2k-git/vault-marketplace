"use client";

import { useEffect, useRef, useState } from "react";
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
    setShowCalendar(false);
  };

  // Global listener clicks
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button onClick={() => setShowCalendar((prev) => !prev)}>
        <MdDateRange className="size-5" />
      </button>

      {showCalendar && (
        <div
          className={`absolute right-0 z-40 ${
            position === "top" ? "bottom-full mb-2 " : "top-full mt-2"
          }`}
          onClick={() => setShowCalendar(false)}
        >
          <div
            className=" bg-gray-300 rounded-xl shadow-xl max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              dateFormat={"MM/dd/yyyy"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
