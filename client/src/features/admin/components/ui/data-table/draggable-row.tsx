// draggable-row.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Row } from "@tanstack/react-table";

type DraggableRowProps<
  TData extends { id: TId },
  TId extends string | number = string | number
> = {
  row: Row<TData>;
};

export function DraggableRow<
  TData extends { id: TId },
  TId extends string | number = string | number
>({ row }: DraggableRowProps<TData, TId>) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      ref={setNodeRef}
      role="row"
      aria-selected={row.getIsSelected()}
      aria-grabbed={isDragging}
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      className="relative z-0 transition-transform duration-200 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
