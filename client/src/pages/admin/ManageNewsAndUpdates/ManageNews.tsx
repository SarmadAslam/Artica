import { useFetchNewsQuery } from "@/api/news";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { NewsType } from "@/types/news";
import { newsColumns } from "./news-columns";
import { NewsFormSheet } from "./NewsFormSheet";

export default function ManageNews() {
  const { data = [], isLoading } = useFetchNewsQuery();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          breadcrumbLinks={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Manage News" },
          ]}
        />
        <div className="flex flex-col gap-4 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">News & Updates</h2>
            <NewsFormSheet />
          </div>
          <DataTable<NewsType>
            data={data.map((n) => ({ ...n, id: n.id || "id_" + Math.random() }))}
            columns={newsColumns}
            tabLabel="news"
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
