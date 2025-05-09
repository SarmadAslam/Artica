import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SectionCards } from "../ManageUsers/section-cards";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { getUserColumns } from "../ManageUsers/user-columns";
import PlatformActivityChart from "@/features/admin/components/Charts/PlatformActivityChart";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUsers } from "@/api/users.ts";
import { UserType } from "@/types/user.ts";

const breadcrumbLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
];

export default function ManageUsers() {
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    setLoading(true);
    setError("");
    getUsers()
      .then((res) => {
        const normalized = res.map((user: any) => ({
          ...user,
          id: user._id,
        }));
        setData(normalized);
      })
      .catch((err) => {
        console.error("Failed to load users:", err); // ✅ Add useful log
        setError("Failed to load users.");
      })
      .finally(() => setLoading(false));
  }

  function handleRefresh() {
    fetchUsers();
  }


  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbLinks={breadcrumbLinks} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <PlatformActivityChart />
              {loading ? (
                <div className="text-muted-foreground">Loading users...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <DataTable<UserType>
                  data={data}
                  columns={getUserColumns(handleRefresh)}
                  tabLabel="users"
                  initialVisibility={{
                    isVerified: false,
                    isActive: false,
                    accessGranted: false,
                    signupDate: false,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}