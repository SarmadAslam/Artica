import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/user";
import { MoreVerticalIcon } from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialogue";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DragHandle } from "@/features/admin/components/ui/data-table/drag-handle";
import { RowDetailSheet } from "@/features/admin/components/ui/data-table/row-detail-sheet";

// Memoized detail sheet per row
const UserRowDetail = React.memo(
  ({
    user,
    onSave,
  }: {
    user: UserType;
    onSave: (id: string, data: Partial<UserType>) => void;
  }) => (
    <RowDetailSheet
      row={user}
      labelKey="firstName"
      triggerContent={
        <Button
          variant="link"
          className="px-0 text-left text-sm font-medium text-foreground"
        >
          {user.firstName} {user.lastName}
        </Button>
      }
      onSave={onSave}
    />
  )
);
UserRowDetail.displayName = "UserRowDetail";

interface GetUserColumnsProps {
  onUpdate: (id: string, data: Partial<UserType>) => void;
  onToggleActive: (id: string, newStatus: boolean) => void;
  onDelete: (id: string) => void;
}

export const getUserColumns = ({
  onUpdate,
  onToggleActive,
  onDelete,
}: GetUserColumnsProps): ColumnDef<UserType>[] => {
  return [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => (
        <UserRowDetail user={row.original} onSave={onUpdate} />
      ),
      meta: { filterVariant: "text" },
      enableHiding: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      meta: { filterVariant: "text" },
      enableHiding: true,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.role || "—"}
        </Badge>
      ),
      meta: { filterVariant: "select", options: ["client", "artist", "admin"] },
      enableHiding: true,
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => {
        const country = row.original.country?.trim();
        return country ? (
          <span className="capitalize">{country}</span>
        ) : (
          "—"
        );
      },
      meta: { filterVariant: "text" },
      enableHiding: true,
    },
    {
      accessorKey: "isVerified",
      header: "Verified",
      cell: ({ row }) => <Checkbox checked={row.original.isVerified} disabled />,
      meta: { filterVariant: "select", options: ["true", "false"] },
      enableHiding: true,
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Checkbox
          checked={row.original.isActive}
          onCheckedChange={() =>
            onToggleActive(row.original.id, !row.original.isActive)
          }
        />
      ),
      meta: { filterVariant: "select", options: ["true", "false"] },
      enableHiding: true,
    },
    {
      accessorKey: "signupDate",
      header: "Joined",
      cell: ({ row }) =>
        row.original.signupDate
          ? new Date(row.original.signupDate).toLocaleDateString()
          : "—",
      meta: { filterVariant: "text" },
      enableHiding: true,
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      enableHiding: false,
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ConfirmDialog
              title="Delete User?"
              description="This action is permanent."
              confirmLabel="Delete"
              onConfirm={() => onDelete(row.original.id)}
              trigger={<DropdownMenuItem>Delete</DropdownMenuItem>}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
};
