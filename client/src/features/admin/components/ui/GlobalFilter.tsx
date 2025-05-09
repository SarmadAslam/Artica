import { Input } from "@/components/ui/input";
import { XIcon, SearchIcon } from "lucide-react"; // ✅ Added clear icon
import { Table } from "@tanstack/react-table";
import { useState } from "react";

interface GlobalFilterProps<T> {
  table: Table<T>;
}

export function GlobalFilter<T>({ table }: GlobalFilterProps<T>) {
  const [value, setValue] = useState(table.getState().globalFilter ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    table.setGlobalFilter(e.target.value);
  };

  const clearFilter = () => {
    setValue("");
    table.setGlobalFilter("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
        <SearchIcon className="h-4 w-4" />
      </span>

      <Input
        type="text"
        placeholder="Search all..."
        value={value}
        onChange={handleChange}
        className="pl-9 pr-9 h-9 focus-visible:ring-2 focus-visible:ring-[#421983] transition-all"
        aria-label="Global search"
      />

      {value && (
        <button
          type="button"
          onClick={clearFilter}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label="Clear search"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
