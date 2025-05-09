import { ReactNode, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge"; 
import { ColumnsIcon, ChevronDownIcon, ChevronUpIcon, FilterIcon, XIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { TableFilters } from "./table-filters";

interface TableToolbarProps<T> {
  table: Table<T>;
  children?: ReactNode;
}

export function TableToolbar<T>({ table, children }: TableToolbarProps<T>) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [resetCounter, setResetCounter] = useState(0); 
  const [filterCount, setFilterCount] = useState(0); // ✅ track filter count immediately

  const columns = table
    .getAllColumns()
    .filter((column) => column.getCanHide() && typeof column.accessorFn !== "undefined");

  const filtersKey = useMemo(() => {
    return JSON.stringify(table.getState().columnFilters);
  }, [table.getState().columnFilters]);

  const resetFilters = () => {
    table.resetColumnFilters();
    table.setGlobalFilter("");
    setResetCounter((c) => c + 1); 
    setFilterCount(0); // ✅ reset local filter count
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Top row: Filters and Columns buttons */}
      <div className="flex justify-end gap-2 px-4 pt-2">
        
        {/* Filters Button */}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 relative"
          onClick={() => setFiltersOpen((prev) => !prev)}
        >
          <FilterIcon className="h-4 w-4" />
          Filters
          {filtersOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
          {filterCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {filterCount}
            </Badge>
          )}
        </Button>

        {/* Columns Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" aria-label="Select Columns">
              <ColumnsIcon className="mr-2 h-4 w-4" />
              Columns
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(checked) => column.toggleVisibility(!!checked)}
                className="capitalize"
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Filters Panel */}
      {filtersOpen && (
        <div className="mx-4 mt-2 rounded-lg border bg-background p-4 shadow-sm flex flex-col gap-4 animate-in fade-in-5 slide-in-from-top-2 transition-all">
          <TableFilters key={filtersKey} table={table} resetCounter={resetCounter} onFilterChange={setFilterCount} /> {/* ✅ pass callback */}

          {filterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground hover:text-[#F35E21] hover:border-[#F35E21] transition-colors w-fit"
              onClick={resetFilters}
            >
              <XIcon className="mr-1 h-4 w-4" /> Reset all
            </Button>
          )}
        </div>
      )}

      {/* External Children / Actions */}
      <div className="flex items-center justify-between gap-2 px-4">
        {children}
      </div>
    </div>
  );
}
