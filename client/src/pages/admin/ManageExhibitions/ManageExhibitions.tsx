import { useFetchExhibitionsQuery } from "@/api/exhibitions";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { ExhibitionType } from "@/types/exhibition";
import { exhibitionColumns } from "./exhibition-columns";
import { ExhibitionFormSheet } from "./ExhibitionFormSheet";
import { Loader2 } from "lucide-react";

export default function ManageExhibitions() {
  const { data = [], isLoading, isError } = useFetchExhibitionsQuery();

  const sanitizedData: ExhibitionType[] = data.map((e) => ({
    ...e,
    id: e.id || (e as any)._id, // normalize if backend sends _id
  }));

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          breadcrumbLinks={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Manage Exhibitions" },
          ]}
        />

        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-medium">Art Exhibitions</h2>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48 text-muted-foreground">
              <Loader2 className="animate-spin mr-2" />
              Loading exhibitions...
            </div>
          ) : isError ? (
            <div className="text-red-500">Failed to load exhibitions.</div>
          ) : (
            <DataTable<ExhibitionType>
              data={sanitizedData}
              columns={exhibitionColumns}
              tabLabel="exhibitions"
              initialVisibility={{
                startDate: true,
                endDate: true,
                status: true,
                artistSubmissions: true,
              }}
              toolbarContent={
                <div className="flex w-full items-center justify-between">
                  <ExhibitionFormSheet />
                </div>
              }
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
