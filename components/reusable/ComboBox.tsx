'use client'

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

export interface ComboBoxItem {
    value: string;
    label: string;
}

export interface ComboBoxProps {
    items: ComboBoxItem[];
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    classsName?: string;
    onChange?: (value: string) => void
}
const ComboBox = ({
    items = [],
    placeholder = 'Select an option...',
    searchPlaceholder = 'Search...',
    emptyMessage = 'No item found',
    classsName,
    onChange,
}: ComboBoxProps) => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')

    // Look up the label of the currently selected item
    const selectedLabel = items.find(item => item.value === value)?.label

    const handleSelect = (currentValue: string) => {
        // If item is already selected, deselect it when clicked(kind of toggle)
        const newValue = currentValue === value ? '' : currentValue
        setValue(newValue)
        setOpen(false)
        onChange?.(newValue)
    }

    console.log('ITEMS',items?.map(i => i.value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <button 
                role="combobox"
                aria-expanded={open}
                aria-controls="combo-listbox"
                className={cn("flex justify-between items-center border", classsName)}
            >
                <span className="text-gray-300">{selectedLabel || placeholder}</span>
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </button>
        </PopoverTrigger>
        <PopoverContent className="bg-gray-800 p-0 pb-2 z-50">
            <Command className="bg-gray-800">
                <CommandInput placeholder={searchPlaceholder} className="h-9 border-none"/>
                <CommandList className="mt-4">
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup className="">
                        {items.map(item => (
                            <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={() => handleSelect(item.value)}
                            >
                                <CheckIcon
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === item.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}

export default ComboBox