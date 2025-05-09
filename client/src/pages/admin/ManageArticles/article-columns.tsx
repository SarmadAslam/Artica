import { ColumnDef } from "@tanstack/react-table";
import { ArticleType } from "@/types/article";
import { RowDetailSheet } from "@/features/admin/components/ui/data-table/row-detail-sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { DragHandle } from "@/features/admin/components/ui/data-table/drag-handle";
import { toast } from "sonner";
import { ArticleActions } from "./ArticleActions";

export const articleColumns: ColumnDef<ArticleType>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <RowDetailSheet
        row={row.original}
        labelKey="title"
        onSave={async (id, updated) => {
          toast.info("Editing articles is coming soon!");
        }}
        fieldConfig={{
          title: { type: "text" },
          category: { type: "text" },
          publishedDate: { type: "date" },
        }}
      />
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    meta: { filterVariant: "text" },
  },
  {
    accessorKey: "category",
    header: "Category",
    meta: { filterVariant: "text" },
  },
  {
    accessorKey: "publishedDate",
    header: "Published",
    cell: ({ row }) =>
      new Date(row.original.publishedDate).toLocaleDateString(),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <ArticleActions article={row.original} />,
  },
];
