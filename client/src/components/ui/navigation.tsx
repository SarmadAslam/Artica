"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Art Listings",
    href: "/art-listings",
    description: "Browse and discover stunning artwork from various artists."
  },
  {
    title: "Job Postings",
    href: "/job-postings",
    description: "Find and apply for freelance art-related job opportunities."
  },
  {
    title: "Competitions",
    href: "/competitions",
    description: "Participate in exciting art competitions and showcase your talent."
  },
  {
    title: "Exhibitions",
    href: "/exhibitions",
    description: "Explore virtual exhibitions featuring curated artwork collections."
  },
  {
    title: "Bidding System",
    href: "/bidding",
    description: "Bid on artwork and commission custom pieces from talented artists."
  },
  {
    title: "Artist Profiles",
    href: "/artists",
    description: "View artist portfolios and connect with skilled creators."
  }
];

export default function Navigation() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Company</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/30 to-muted/10 p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      RungLey
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      A platform connecting traditional artists with clients and opportunities.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/about" title="About RungLey">
                Learn more about our mission and how we support artists.
              </ListItem>
              <ListItem href="/how-it-works" title="How It Works">
                A step-by-step guide to using RungLey effectively.
              </ListItem>
              <ListItem href="/contact" title="Contact Us">
                Get in touch for support, partnerships, or inquiries.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/documentation" className={navigationMenuTriggerStyle()}>
            Contact Us
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";