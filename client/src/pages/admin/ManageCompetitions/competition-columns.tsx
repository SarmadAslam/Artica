import { ColumnDef } from "@tanstack/react-table";
import { CompetitionType } from "@/types/competition";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RowDetailSheet } from "@/features/admin/components/ui/data-table/row-detail-sheet";
import {
  useDeleteCompetitionMutation,
  useUpdateCompetitionMutation,
} from "@/api/competitions";
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

export const competitionColumns: ColumnDef<CompetitionType>[] = [
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
      const [updateCompetition] = useUpdateCompetitionMutation();
      const navigate = useNavigate();

      return (
        <div className="flex items-center justify-between gap-2">
          <RowDetailSheet
            row={row.original}
            labelKey="title"
            onSave={async (id, updated) => {
              try {
                await updateCompetition({ id, data: updated }).unwrap();
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
              deadline: { type: "date", required: true },
              status: {
                type: "select",
                options: ["draft", "published", "closed"],
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
              navigate(`/admin/manage-competitions/${row.original.id}/participants`)
            }
          >
            <UsersIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) =>
      new Date(row.original.deadline).toLocaleDateString(),
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
        ? new Date(row.original.createdAt)
        : null;
      const deadline = row.original.deadline
        ? new Date(row.original.deadline)
        : null;

      if (!createdAt || !deadline) return "–";

      const diffTime = deadline.getTime() - createdAt.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} day(s)`;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filterVariant: "select",
      options: ["draft", "published", "closed"],
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "votes",
    header: "Votes",
    cell: ({ row }) => row.original.votes || 0,
  },
  {
    accessorKey: "participationCount",
    header: "Participants",
    cell: ({ row }) => row.original.participationCount || 0,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const [deleteCompetition] = useDeleteCompetitionMutation();
      const [updateCompetition] = useUpdateCompetitionMutation();
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
              onClick={async () => {
                await toast.promise(
                  updateCompetition({
                    id: row.original.id,
                    data: { votes: 0 },
                  }),
                  {
                    loading: "Resetting votes...",
                    success: "Votes reset",
                    error: "Failed to reset",
                  }
                );
              }}
            >
              Reset Votes
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigate(`/admin/manage-competitions/${row.original.id}/participants`)
              }
            >
              Manage Participants
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await toast.promise(deleteCompetition(row.original.id), {
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
