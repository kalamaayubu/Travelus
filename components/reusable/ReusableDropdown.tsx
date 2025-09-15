// components/ReusableDropdown.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReusableDropdownProps } from "@/types";


export default function ReusableDropdown({
  triggerText = "Open",
  trigger,
  label,
  items,
  contentClassName = '',
}: ReusableDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <button className="px-3 py-1.5 rounded-md border">{triggerText}</button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent 
        className={`!static !w-auto !max-h-auto bg-white/5 hover:bg-white/10 !overflow-visible ${contentClassName}`}
      >
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && <DropdownMenuSeparator />}

        {items.map((item, index) => (
          <div key={index}>
            <DropdownMenuItem
                className="!hover:bg-white/15 !text-white !cursor-pointer" 
                onClick={item.onClick}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </DropdownMenuItem>
            {item.separator && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
