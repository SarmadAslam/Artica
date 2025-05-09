import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { SearchForm } from "@/components/ui/search-form";
import { ModeToggle } from "@/components/mode-toggle";

interface BreadcrumbLinkItem {
  label: string;
  href?: string; // Optional because the last item (current page) won't have a link
}

interface AdminHeaderProps {
  title?: string; // Optional title, in case you want to display it
  breadcrumbLinks: BreadcrumbLinkItem[]; // Array of breadcrumb items
}

export const SiteHeader: React.FC<AdminHeaderProps> = ({ breadcrumbLinks }) => {
  return (
    <>
      <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-14 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear w-full px-4 lg:px-6">
        <div className="flex items-center gap-2 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbLinks.map((link, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem
                    className={index === 0 ? "hidden md:block" : ""}
                  >
                    {link.href ? (
                      <BreadcrumbLink href={link.href}>
                        {link.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{link.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbLinks.length - 1 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <ModeToggle />
         
        </div>
      </header>
    </>
  );
};
