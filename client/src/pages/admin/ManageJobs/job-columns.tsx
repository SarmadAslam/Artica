import { ColumnDef } from "@tanstack/react-table";
import { JobType } from "@/types/job";
import { DragHandle } from "@/features/admin/components/ui/data-table/drag-handle";
import { RowDetailSheet } from "@/features/admin/components/ui/data-table/row-detail-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVerticalIcon } from "lucide-react";
import { useDeleteJobMutation, useUpdateJobMutation } from "@/api/jobApi"; // ✅ Updated
import { toast } from "sonner";

export const jobColumns: ColumnDef<JobType>[] = [
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
      const [updateJob] = useUpdateJobMutation();
      return (
        <RowDetailSheet
          row={row.original}
          labelKey="title"
          onSave={async (id, updatedData) => {
            const { id: removed, ...cleanData } = updatedData; // ✅ Remove duplicate id
            await updateJob({ id, ...cleanData });
          }}
          triggerContent={
            <span
              className="px-0 text-left font-medium hover:underline cursor-pointer"
              role="button"
              tabIndex={0}
            >
              {row.original.title}
            </span>
          }
          fieldConfig={{
            jobType: {
              type: "select",
              options: ["Freelance", "Full-time", "Part-time", "Contract"],
            },
            workplaceType: {
              type: "select",
              options: ["Remote", "On-Site", "Hybrid"],
            },
            budget: {
              type: "select",
              options: ["Rs 1 to 5k", "Rs 6 to 15k", "Rs 16 to 25k", "Other"],
            },
          }}
        />
      );
    },
    meta: { filterVariant: "text" },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="line-clamp-2 text-muted-foreground">
        {row.original.description}
      </div>
    ),
    meta: { filterVariant: "text" },
  },
  {
    accessorKey: "jobType",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize text-muted-foreground">
        {row.original.jobType}
      </Badge>
    ),
    meta: {
      filterVariant: "select",
      options: ["Freelance", "Full-time", "Part-time", "Contract"],
    },
  },
  {
    accessorKey: "workplaceType",
    header: "Workplace",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize text-muted-foreground">
        {row.original.workplaceType}
      </Badge>
    ),
    meta: {
      filterVariant: "select",
      options: ["Remote", "On-Site", "Hybrid"],
    },
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) =>
      row.original.budget === "Other"
        ? `Custom: Rs ${row.original.customBudget}`
        : row.original.budget,
    meta: {
      filterVariant: "select",
      options: ["Rs 1 to 5k", "Rs 6 to 15k", "Rs 16 to 25k", "Other"],
    },
  },
  {
    accessorKey: "startDate",
    header: "Start",
    cell: ({ row }) =>
      row.original.startDate
        ? new Date(row.original.startDate).toLocaleDateString()
        : "-",
  },
  {
    accessorKey: "endDate",
    header: "End",
    cell: ({ row }) =>
      row.original.endDate
        ? new Date(row.original.endDate).toLocaleDateString()
        : "-",
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const [deleteJob] = useDeleteJobMutation();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-muted-foreground hover:bg-muted"
            >
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={async () => {
                if (confirm("Are you sure you want to delete this job?")) {
                  await toast.promise(deleteJob(row.original.id), {
                    loading: "Deleting...",
                    success: "Job deleted",
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
