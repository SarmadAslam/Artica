import { ReactNode } from "react";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { TableSkeleton } from "@/features/admin/components/ui/data-table/TableSkeleton";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ManagePageProps<TData> {
  title: string;
  breadcrumbLinks: { label: string; href?: string }[];
  data: TData[];
  columns: any; // ColumnDef<TData>[], but kept generic
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  tabLabel?: string;
  initialVisibility?: Record<string, boolean>;
  onRefresh?: () => void;
  toolbarContent?: ReactNode;
  topWidgets?: ReactNode;
}

export function ManagePage<TData extends { id: string | number; }>({
  title,
  breadcrumbLinks,
  data,
  columns,
  loading,
  error,
  emptyMessage = "No data found.",
  tabLabel,
  initialVisibility,
  onRefresh,
  toolbarContent,
  topWidgets,
}: ManagePageProps<TData>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbLinks={breadcrumbLinks} />

        <div className="flex flex-col flex-1">
          <div className="@container/main flex flex-1 flex-col gap-4 py-6 px-4 lg:px-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{title}</h2>
              <div className="flex gap-2">
                {toolbarContent}
                {onRefresh && (
                  <Button
                    onClick={onRefresh}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Loader2 className="h-4 w-4" />
                    Refresh
                  </Button>
                )}
              </div>
            </div>

            {topWidgets && <div className="space-y-4">{topWidgets}</div>}

            {loading ? (
              <TableSkeleton rows={8} columns={6} />
            ) : error ? (
              <div className="text-center text-red-500 py-10">{error}</div>
            ) : data.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">
                {emptyMessage}
              </div>
            ) : (
              <DataTable<TData>
                data={data}
                columns={columns}
                tabLabel={tabLabel}
                initialVisibility={initialVisibility}
              />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
