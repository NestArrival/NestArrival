"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

interface CustomDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select Date",
  className = "",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleSelectDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const isSelected = value === dateStr;
    days.push(
      <button
        key={d}
        type="button"
        onClick={() => handleSelectDate(d)}
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
          isSelected
            ? "bg-[#cfa052] text-white"
            : "text-[#5c544d] hover:bg-[#f4efe6] hover:text-[#2c2724]"
        }`}
      >
        {d}
      </button>
    );
  }

  // Format value for display (e.g. YYYY-MM-DD -> Oct 12, 2026)
  const displayValue = value
    ? new Date(value + "T00:00:00").toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" })
    : placeholder;

  return (
    <div className={`relative w-full ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-sm font-bold text-[#2c2724] bg-transparent outline-none cursor-pointer py-1"
      >
        <span className={!value ? "text-[#a89e8d]" : "text-[#2c2724]"}>
          {displayValue}
        </span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 w-72 mt-3 left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 bg-white border border-[#eae1d3] rounded-3xl shadow-[0_20px_50px_rgba(44,39,36,0.15)] p-4 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button type="button" onClick={prevMonth} className="p-1 hover:bg-[#f4efe6] rounded-full transition-colors text-[#5c544d]">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-black text-[#2c2724]">{monthName} {year}</span>
              <button type="button" onClick={nextMonth} className="p-1 hover:bg-[#f4efe6] rounded-full transition-colors text-[#5c544d]">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-[10px] font-extrabold uppercase text-[#a89e8d]">{day}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 justify-items-center">
              {days}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
