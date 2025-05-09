import { ColumnDef } from "@tanstack/react-table";
import { NewsType } from "@/types/news";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RowDetailSheet } from "@/features/admin/components/ui/data-table/row-detail-sheet";
import { useDeleteNewsMutation, useUpdateNewsMutation } from "@/api/news";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@radix-ui/react-checkbox";
import { DragHandle } from "@/features/admin/components/ui/data-table/drag-handle";

export const newsColumns: ColumnDef<NewsType>[] = [
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
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    cell: ({ row }) => {
      const [updateNews] = useUpdateNewsMutation();
      return (
        <RowDetailSheet
          row={row.original}
          labelKey="title"
          onSave={async (id, updated) => {
            try {
              await updateNews({ id, data: updated }).unwrap();
              toast.success("Article updated!");
            } catch (error) {
              toast.error("Failed to update News or Update");
              console.error(error);
            }
          }}
          fieldConfig={{
            title: { type: "text" },
            content: { type: "text" },
            category: { type: "text" },
            published: { type: "boolean" },
          }}
        />
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.category}
      </Badge>
    ),
    meta: { filterVariant: "select", options: ["event", "competition", "general"] },
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) =>
      row.original.published ? (
        <Badge className="text-green-600 border-green-600 bg-green-100 dark:bg-green-900">
          Published
        </Badge>
      ) : (
        <Badge variant="outline">Draft</Badge>
      ),
  },
  {
    accessorKey: "publishedAt",
    header: "Published At",
    cell: ({ row }) =>
      row.original.publishedAt
        ? new Date(row.original.publishedAt).toLocaleDateString()
        : "-",
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const [deleteNews] = useDeleteNewsMutation();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async () => {
                await toast.promise(deleteNews(row.original.id), {
                  loading: "Deleting...",
                  success: "Deleted successfully",
                  error: "Failed to delete",
                });
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
