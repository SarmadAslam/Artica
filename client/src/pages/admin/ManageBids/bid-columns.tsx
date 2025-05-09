import { ColumnDef } from "@tanstack/react-table";
import { BidType } from "@/types/bid";
import { Badge } from "@/components/ui/badge";
import { RowDetailSheet } from "@/features/admin/components/ui/data-table/row-detail-sheet";
import { useUpdateBidMutation, useDeleteBidMutation } from "@/api/bids";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@radix-ui/react-checkbox";
import { DragHandle } from "@/features/admin/components/ui/data-table/drag-handle";

export const bidColumns: ColumnDef<BidType>[] = [
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
    accessorKey: "jobTitle",
    header: "Job",
    cell: ({ row }) => {
      const [updateBid] = useUpdateBidMutation();
      return (
        <RowDetailSheet
          row={row.original}
          labelKey="jobTitle"
          onSave={async (id, updated) => {
            try {
              await updateBid({ id, data: updated }).unwrap();
              toast.success("Bid updated!");
            } catch (error) {
              toast.error("Failed to update bid");
              console.error(error);
            }
          }}
          fieldConfig={{
            jobTitle: { type: "text" },
            artist: { type: "text" },
            price: { type: "number" },
            status: { type: "select", options: ["pending", "approved", "rejected"] },
          }}
        />
      );
    },
  },
  {
    accessorKey: "artist",
    header: "Artist",
    meta: { filterVariant: "text" },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => `Rs ${row.original.price}`,
    meta: { filterVariant: "range" },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.status}
      </Badge>
    ),
    meta: { filterVariant: "select", options: ["pending", "approved", "rejected"] },
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) => new Date(row.original.submittedAt).toLocaleDateString(),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const [deleteBid] = useDeleteBidMutation();
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
                if (confirm("Delete this bid?")) {
                  await toast.promise(deleteBid(row.original.id), {
                    loading: "Deleting...",
                    success: "Deleted",
                    error: "Failed to delete",
                  });
                }
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
