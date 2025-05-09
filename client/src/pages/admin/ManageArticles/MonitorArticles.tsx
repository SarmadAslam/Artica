import { useFetchArticlesQuery } from "@/api/articles";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { articleColumns } from "./article-columns";
import { ArticleType } from "@/types/article";
import { TableSkeleton } from "@/features/admin/components/ui/data-table/TableSkeleton";
import { Button } from "@/components/ui/button";

export default function ManageArticles() {
  const {
    data: articles = [],
    isLoading,
    isError,
    refetch,
  } = useFetchArticlesQuery();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader
          breadcrumbLinks={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Manage Articles" },
          ]}
        />

        <div className="flex flex-col gap-4 py-6 px-4 lg:px-6">
          <div className="flex justify-end">
            <Button onClick={() => refetch()} variant="outline" size="sm">
              Refresh Articles
            </Button>
          </div>

          {isLoading ? (
            <TableSkeleton rows={8} columns={5} />
          ) : isError ? (
            <div className="text-center text-red-500 py-10">
              Failed to fetch articles.
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              No articles found.
            </div>
          ) : (
            <DataTable<ArticleType>
              data={articles.map((a) => ({ ...a, id: a._id || a.id }))}
              columns={articleColumns}
              tabLabel="articles"
            />
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
