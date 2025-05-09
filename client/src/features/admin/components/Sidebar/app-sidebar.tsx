"use client";

import * as React from "react";
import {
  BookOpen,
  Brush,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  User,
  BriefcaseBusiness,
  Trophy,
  Image,
  FileText,
  Newspaper
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

const navMain = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: SquareTerminal,
  },
  {
    title: "Manage Users",
    url: "/admin/manage-users",
    icon: User,
  },
  {
    title: "Manage Jobs",
    url: "/admin/manage-jobs",
    icon: BriefcaseBusiness,
  },
  // {
  //   title: "Manage Bids",
  //   url: "/admin/manage-bids",
  //   icon: BookOpen,
  // },
  {
    title: "Manage Competitions",
    url: "/admin/manage-competitions",
    icon: Trophy,
  },
  {
    title: "Manage Exhibitions",
    url: "/admin/manage-exhibitions",
    icon: Image,
  },
  {
    title: "Manage Articles",
    url: "/admin/manage-articles",
    icon: FileText,
  },
  {
    title: "Manage News & Updates",
    url: "/admin/manage-news-updates",
    icon: Newspaper,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "/admin/settings#general",
      },
      {
        title: "Profile",
        url: "/admin/settings#profile",
      },
      {
        title: "Email",
        url: "/admin/settings#email",
      },
      {
        title: "Password",
        url: "/admin/settings#password",
      },
      {
        title: "Notifications",
        url: "/admin/settings#notifications",
      },
    ]
  },
];

const navSecondary = [
  {
    title: "Support",
    url: "#",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "#",
    icon: Send,
  },
];

const user = {
  name: "Sarmad",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Brush className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">RungLey</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {/* <NavSecondary items={navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
