import * as React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { SearchForm } from "@/components/ui/search-form";
import { NavigationMenuDesktop } from "./NavigationMenuDesktop";
import { NavigationMenuMobile } from "./NavigationMenuMobile";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 py-3 md:px-6 flex flex-wrap items-center justify-between gap-y-2">
        
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-4 flex-wrap">
          <a href="/" className="text-xl font-bold tracking-tight whitespace-nowrap">
            RungLey
          </a>
          <a
            href="/"
            className="hidden md:inline text-sm font-medium px-3 py-2 hover:text-primary"
          >
            Home
          </a>
          <NavigationMenuDesktop />
        </div>

        {/* Right: Tools */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Search - hidden on mobile */}
          <div className="hidden md:block max-w-[160px]">
            <SearchForm />
          </div>

          <ModeToggle />

          <Button variant="secondary" size="sm" asChild>
            <a href="/login">Login</a>
          </Button>
          <Button variant="default" size="sm" asChild>
            <a href="/role-selection">Sign Up</a>
          </Button>

          {/* Mobile Drawer Nav */}
          <NavigationMenuMobile />
        </div>
      </div>
    </header>
  );
};
