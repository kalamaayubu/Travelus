'use client';

import { useState, useRef, useEffect } from "react";
import { FieldError } from "react-hook-form";

export type Option = { label: string; value: string };

type ComboBoxProps = {
  options: Option[];
  value?: string; // controlled
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  error?: FieldError; // for RHF error display
};

export default function ComboBox({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  defaultValue,
  error,
}: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValue = value ?? uncontrolled;
  const selectedOption = options.find((o) => o.value === selectedValue);

  const filteredOptions = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    if (value === undefined) setUncontrolled(val);
    onChange?.(val);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={isOpen ? search : selectedOption?.label || ""}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onClick={() => setIsOpen((o) => !o)}
        className={`w-full px-3 py-2 rounded-lg border ${
          error ? "border-red-500" : "border-gray-600"
        } bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none`}
      />

      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-50 w-full bg-gray-800 border border-gray-600 rounded-lg mt-1 max-h-48 overflow-auto">
          {filteredOptions.map((opt) => (
            <li
              key={opt.value}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-700 ${
                selectedValue === opt.value ? "bg-gray-700 font-medium" : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filteredOptions.length === 0 && (
        <div className="absolute z-50 w-full bg-gray-800 border border-gray-600 rounded-lg mt-1 px-3 py-2 text-gray-400">
          No results
        </div>
      )}

      {error && <p className="mt-1 text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
