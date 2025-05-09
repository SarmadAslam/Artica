"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getUsers, updateUser, deleteUser } from "@/api/users";
import { useQueryClient } from "@tanstack/react-query";
import { UserType } from "@/types/user";

import { AppSidebar } from "@/features/admin/components/Sidebar/app-sidebar";
import { SiteHeader } from "@/features/admin/components/Sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SectionCards } from "./section-cards";
import { UsersChart } from "@/features/admin/components/Charts/UsersChart";
import { UsersByCountryChart } from "@/features/admin/components/Charts/UsersByCountryChart";
import { DataTable } from "@/features/admin/components/ui/data-table/data-table";
import { getUserColumns } from "./user-columns";
import { TableSkeleton } from "@/features/admin/components/ui/data-table/TableSkeleton";
import { Button } from "@/components/ui/button";
import { UserFormModal } from "./UserFormModal";
import { toast } from "sonner";

const breadcrumbLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Manage Users" },
];

export default function ManageUsers() {
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const queryClient = useQueryClient();

  const fetchUsers = useCallback(() => {
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
        console.error("Failed to load users:", err);
        setError("Failed to load users.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserUpdate = useCallback(
    async (id: string, updated: Partial<UserType>) => {
      try {
        await toast.promise(updateUser(id, updated), {
          loading: "Updating...",
          success: "User updated.",
          error: "Failed to update.",
        });
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    },
    [fetchUsers]
  );

  const handleToggleActive = useCallback(
    async (id: string, newStatus: boolean) => {
      const prevData = [...data];
      setData((current) =>
        current.map((user) =>
          user.id === id ? { ...user, isActive: newStatus } : user
        )
      );

      try {
        await updateUser(id, { isActive: newStatus });
        toast.success(newStatus ? "User activated" : "User deactivated");
      } catch (err) {
        setData(prevData); // rollback
        toast.error("Failed. Reverted.");
        console.error(err);
      }
    },
    [data]
  );

  const handleDeleteUser = useCallback(
    async (id: string) => {
      try {
        await toast.promise(deleteUser(id), {
          loading: "Deleting...",
          success: "User deleted.",
          error: "Failed to delete.",
        });
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    },
    [fetchUsers]
  );

  const columns = useMemo(
    () =>
      getUserColumns({
        onUpdate: handleUserUpdate,
        onToggleActive: handleToggleActive,
        onDelete: handleDeleteUser,
      }),
    [handleUserUpdate, handleToggleActive, handleDeleteUser]
  );

  const handleSimpleClick = () => {
    console.log("Simple button clicked!");
    alert("Simple functionality triggered.");
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbLinks={breadcrumbLinks} />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="flex justify-between items-center px-4 lg:px-6 gap-2">
                
                <UserFormModal onUserCreated={fetchUsers} />

                <Button onClick={handleSimpleClick} variant="default" size="sm">
                  Simple Button
                </Button>

                <Button onClick={fetchUsers} variant="outline" size="sm">
                  Refresh Users
                </Button>
              </div>

              <SectionCards />

              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <UsersChart />
                  </div>
                  <div>
                    <UsersByCountryChart />
                  </div>
                </div>
              </div>

              <div>
                {loading ? (
                  <TableSkeleton rows={8} columns={6} />
                ) : error ? (
                  <div className="text-center text-red-500 py-10">{error}</div>
                ) : data.length === 0 ? (
                  <div className="text-center text-muted-foreground py-10">
                    No users found.
                  </div>
                ) : (
                  <DataTable<UserType>
                    data={data}
                    columns={columns}
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
