"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    airport?: string;
  }[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Combobox({
  id,
  name,
  options,
  placeholder = "Select an option...",
  value,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value || "");

  const currentOption = options.find(
    (option) => option.value === internalValue
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {currentOption ? (
            <span className="truncate">
              {currentOption.label}
              {currentOption.airport && ` (${currentOption.airport})`}
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  const newValue =
                    currentValue === internalValue ? "" : currentValue;
                  setInternalValue(newValue);
                  onChange?.(newValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    internalValue === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
                {option.airport && ` (${option.airport})`}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
      <input type="hidden" name={name} value={internalValue} id={id} />
    </Popover>
  );
}
