import { ColumnDef } from "@tanstack/react-table";
import { ExhibitionType } from "@/types/exhibition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RowDetailSheet } from "@/features/admin/components/ui/data-table/row-detail-sheet";
import {
  useDeleteExhibitionMutation,
  useUpdateExhibitionMutation,
} from "@/api/exhibitions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon, UsersIcon } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@radix-ui/react-checkbox";
import { DragHandle } from "@/features/admin/components/ui/data-table/drag-handle";
import { useNavigate } from "react-router-dom";

export const exhibitionColumns: ColumnDef<ExhibitionType>[] = [
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
      const [updateExhibition] = useUpdateExhibitionMutation();
      const navigate = useNavigate();

      return (
        <div className="flex items-center justify-between gap-2">
          <RowDetailSheet
            row={row.original}
            labelKey="title"
            onSave={async (id, updated) => {
              try {
                await updateExhibition({ id, data: updated }).unwrap();
                toast.success("Updated!");
              } catch (err) {
                toast.error("Update failed");
                console.error(err);
              }
            }}
            fieldConfig={{
              title: { type: "text", required: true },
              description: { type: "text", required: true },
              guidelines: { type: "text", required: true },
              startDate: { type: "date", required: true },
              endDate: { type: "date", required: true },
              status: {
                type: "select",
                options: ["upcoming", "open", "closed"],
                required: true,
              },
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="hover:text-primary"
            title="Manage Participants"
            onClick={() =>
              navigate(`/admin/manage-exhibitions/${row.original.id}/participants`)
            }
          >
            <UsersIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) =>
      new Date(row.original.startDate).toLocaleDateString(),
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) =>
      new Date(row.original.endDate).toLocaleDateString(),
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const start = new Date(row.original.startDate);
      const end = new Date(row.original.endDate);
      const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return `${diffDays} day(s)`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filterVariant: "select",
      options: ["upcoming", "open", "closed"],
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "artistSubmissions",
    header: "Submissions",
    cell: ({ row }) => row.original.artistSubmissions || 0,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const [deleteExhibition] = useDeleteExhibitionMutation();
      const navigate = useNavigate();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/manage-exhibitions/${row.original.id}/participants`)
              }
            >
              Manage Participants
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await toast.promise(deleteExhibition(row.original.id), {
                  loading: "Deleting...",
                  success: "Deleted",
                  error: "Failed",
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
