// table-wrapper.tsx

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DndContext, closestCenter, useSensor, useSensors, MouseSensor, TouchSensor, KeyboardSensor, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { DraggableRow } from "./draggable-row";
import { TablePagination } from "./table-pagination";
import { GlobalFilter } from "../GlobalFilter";
import { Table as TanstackTable } from "@tanstack/react-table";

interface TableWrapperProps<TData extends { id: string | number }> {
  table: TanstackTable<TData>;
}

export function TableWrapper<TData extends { id: string | number }>({ table }: TableWrapperProps<TData>) {
  const [data, setData] = React.useState(() => table.getRowModel().rows.map((row) => row.original));

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const dataIds = React.useMemo(() => data.map((row) => row.id.toString()), [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id.toString());
      const newIndex = dataIds.indexOf(over.id.toString());
      setData((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="p-4 border-b">
        <GlobalFilter table={table} />
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : typeof header.column.columnDef.header === "function"
                      ? header.column.columnDef.header(header.getContext())
                      : header.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                {table.getRowModel().rows.map((row) => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </SortableContext>
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>

      <TablePagination table={table} />
    </div>
  );
}
