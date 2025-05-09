// ManageJobs.tsx
import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { jobColumns } from "./job-columns";
import { useFetchAllJobsQuery } from "@/api/jobApi";
import { JobType } from "@/types/job";
import { JobSectionCards } from "./job-section-cards";
import { TableSkeleton } from "@/features/admin/components/ui/data-table/TableSkeleton";
import { Button } from "@/components/ui/button";

const breadcrumbLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Manage Jobs" },
];

export default function ManageJobs() {
  const { data = [], isLoading, isError, refetch } = useFetchAllJobsQuery(null);

  const normalizedData: JobType[] = data.map((job: JobType) => ({
    ...job,
    id: job._id,
  }));

  function handleRefresh() {
    refetch();
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbLinks={breadcrumbLinks} />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="flex justify-end px-4 lg:px-6">
                <Button onClick={handleRefresh} variant="outline" size="sm">
                  Refresh Jobs
                </Button>
              </div>

              <JobSectionCards />

              <div className="">
                {isLoading ? (
                  <TableSkeleton rows={8} columns={7} />
                ) : isError ? (
                  <div className="text-center text-red-500 py-10">
                    Failed to load jobs.
                  </div>
                ) : normalizedData.length === 0 ? (
                  <div className="text-center text-muted-foreground py-10">
                    No jobs found.
                  </div>
                ) : (
                  <DataTable<JobType>
                    data={normalizedData}
                    columns={jobColumns}
                    tabLabel="jobs"
                    initialVisibility={{ client: false, createdAt: false }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
