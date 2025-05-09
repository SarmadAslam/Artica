import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  ColumnFiltersState,
  VisibilityState,
  SortingState,
} from "@tanstack/react-table";

import { useMemo, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TableWrapper } from "./table-wrapper";
import { TableToolbar } from "./table-toolbar";

interface DataTableProps<TData extends { id: string | number }> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  tabLabel?: string;
  toolbarContent?: React.ReactNode;
  initialVisibility?: Record<string, boolean>;
  defaultSorting?: SortingState;
}

export function DataTable<TData extends { id: string | number }>({
  data,
  columns,
  toolbarContent,
  tabLabel = "default",
  initialVisibility = {},
  defaultSorting = [],
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibility);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
      sorting,
      pagination,
      globalFilter,
    },
    initialState: {
      columnVisibility: initialVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    getRowId: (row) => row.id.toString(),
  });

  const MemoizedToolbar = useMemo(() => (
    <TableToolbar table={table}>{toolbarContent}</TableToolbar>
  ), [table, toolbarContent]);

  return (
    <Tabs defaultValue={tabLabel} className="flex w-full flex-col ml-auto">
      {MemoizedToolbar}
      <TabsContent value={tabLabel} className="relative px-4 lg:px-6">
        <TableWrapper table={table} />
      </TabsContent>
    </Tabs>
  );
}
