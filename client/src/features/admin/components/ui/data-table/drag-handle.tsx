// drag-handle.tsx

import { useSortable } from "@dnd-kit/sortable";
import { GripVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type DragHandleProps = {
  id: string | number;
};

export function DragHandle({ id }: DragHandleProps) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Drag to reorder row"
      {...attributes}
      {...listeners}
      className="cursor-grab text-muted-foreground hover:bg-transparent focus-visible:ring-1 focus-visible:ring-ring"
    >
      <GripVerticalIcon className="h-4 w-4" />
    </Button>
  );
}
