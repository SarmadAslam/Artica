import { useFetchBidsQuery } from "@/api/bids";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { bidColumns } from "./bid-columns";
import { BidType } from "@/types/bid";
import { BidSectionCards } from "./bid-section-cards";

export default function ManageBids() {
  const { data = [], isLoading, isError } = useFetchBidsQuery();

  const normalized = data.map((bid) => ({ ...bid, id: bid.id || "bid_" + Math.random() }));

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbLinks={[{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Manage Bids" }]} />
        <div className="flex flex-col gap-4 py-6">
          <BidSectionCards />
          <div className="px-4 lg:px-6">
            {isLoading ? (
              <p>Loading bids...</p>
            ) : isError ? (
              <p className="text-red-500">Failed to load bids.</p>
            ) : (
              <DataTable<BidType>
                data={normalized}
                columns={bidColumns}
                tabLabel="bids"
              />
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
