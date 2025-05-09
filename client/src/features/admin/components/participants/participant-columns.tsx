import { ColumnDef } from "@tanstack/react-table";
import { Participant } from "./ParticipantManager";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";

export const ParticipantColumns = ({
  onStatusChange,
  onRemove,
}: {
  onStatusChange: (id: string, status: Participant["status"]) => void;
  onRemove: (id: string) => void;
}): ColumnDef<Participant>[] => [
  {
    accessorKey: "artistName",
    header: "Artist Name",
  },
  {
    accessorKey: "artworkTitle",
    header: "Artwork Title",
  },
  {
    accessorKey: "artworkUrl",
    header: "Preview",
    cell: ({ row }) => (
      <img src={row.original.artworkUrl} alt="Artwork" className="h-12 w-12 rounded object-cover" />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      filterVariant: "select",
      options: ["pending", "approved", "rejected"],
    },
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted",
    cell: ({ row }) =>
      new Date(row.original.submittedAt).toLocaleDateString(),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onStatusChange(row.original.id, "approved")}>
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange(row.original.id, "rejected")}>
            Reject
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRemove(row.original.id)}>
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
