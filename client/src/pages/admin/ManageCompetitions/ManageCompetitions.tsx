import { useFetchCompetitionsQuery } from "@/api/competitions";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { CompetitionType } from "@/types/competition";
import { competitionColumns } from "./competition-columns";
import { CompetitionFormSheet } from "./CompetitionFormSheet";
import { Loader2 } from "lucide-react";

export default function ManageCompetitions() {
  const { data = [], isLoading, isError } = useFetchCompetitionsQuery();

  const sanitizedData = data.map((c) => ({
  ...c,
  id: c.id || c._id,
}));

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          breadcrumbLinks={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Manage Competitions" },
          ]}
        />

        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Art Competitions</h2>
            <CompetitionFormSheet />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-48 text-muted-foreground">
              <Loader2 className="animate-spin mr-2" />
              Loading competitions...
            </div>
          ) : isError ? (
            <div className="text-red-500">Failed to load competitions.</div>
          ) : (
            <DataTable<CompetitionType>
              data={sanitizedData}
              columns={competitionColumns}
              tabLabel="competitions"
              initialVisibility={{
                votes: true,
                deadline: true,
                status: true,
                participationCount: true,
              }}
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
