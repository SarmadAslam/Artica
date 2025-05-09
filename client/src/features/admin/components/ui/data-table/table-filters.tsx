// ✅ table-filters.tsx — Bugfixed with live badge sync

import { useEffect, useState } from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface TableFiltersProps<T> {
  table: Table<T>;
  resetCounter?: number;
  onFilterChange?: (count: number) => void;
}

export function TableFilters<T>({ table, resetCounter, onFilterChange }: TableFiltersProps<T>) {
  const [rangeValues, setRangeValues] = useState<Record<string, { min?: number; max?: number }>>({});
  const [selectStates, setSelectStates] = useState<Record<string, string>>({});

  const filterableColumns = table.getAllColumns().filter(
    (col) => col.columnDef.meta?.filterVariant
  );

  useEffect(() => {
    setRangeValues({});
    setSelectStates({});
  }, [resetCounter]);

  // ✅ Sync badge count on actual filter state change
  useEffect(() => {
    const count = table.getState().columnFilters.filter((f) => f.value !== undefined).length;
    onFilterChange?.(count);
  }, [table.getState().columnFilters]);

  return filterableColumns.length ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filterableColumns.map((col) => {
        const id = col.id;
        const label = col.columnDef.header?.toString() || id;
        const variant = col.columnDef.meta?.filterVariant;
        const options = col.columnDef.meta?.options as string[] | undefined;
        const range = rangeValues[id] || {};
        const currentFilter = table.getState().columnFilters.find((f) => f.id === id)?.value;

        return (
          <div key={id} className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium capitalize text-muted-foreground">
              {label}
            </Label>

            {variant === "text" && (
              <Input
                value={(currentFilter as string) ?? ""}
                onChange={(e) => {
                  col.setFilterValue(e.target.value);
                }}
                placeholder="Search..."
                className="h-9"
              />
            )}

            {variant === "select" && (
              <Select
                value={selectStates[id] ?? "all"}
                onValueChange={(value) => {
                  const realVal = value === "all" ? undefined : value;
                  col.setFilterValue(realVal);
                  setSelectStates((prev) => ({ ...prev, [id]: value }));
                }}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {(options ?? []).map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {variant === "range" && (
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={range.min ?? ""}
                  onChange={(e) => {
                    const min = e.target.value ? Number(e.target.value) : undefined;
                    const max = range.max ?? Number.MAX_SAFE_INTEGER;
                    col.setFilterValue([min, max]);
                    setRangeValues((prev) => ({ ...prev, [id]: { ...range, min } }));
                  }}
                  className="h-9 w-24"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={range.max ?? ""}
                  onChange={(e) => {
                    const max = e.target.value ? Number(e.target.value) : undefined;
                    const min = range.min ?? Number.MIN_SAFE_INTEGER;
                    col.setFilterValue([min, max]);
                    setRangeValues((prev) => ({ ...prev, [id]: { ...range, max } }));
                  }}
                  className="h-9 w-24"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  ) : (
    <div className="text-muted-foreground text-sm px-4 py-2">
      No filterable columns configured.
    </div>
  );
}
