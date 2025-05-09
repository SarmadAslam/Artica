import Navigation from "./ui/navigation";
import { Button } from "./ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "./ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { SearchForm } from "./ui/search-form";

export default function Navbar() {
  return (
    <>
    <header className="sticky top-0 z-50 px-8 shadow-lg rounded-lg">
      <div className=" absolute left-0 h-20 w-full bg-background"></div>
      <div className="relative mx-auto max-w-container">
        <NavbarComponent>
          <NavbarLeft>
            <a
              href="/"
              className="flex items-center gap-2 text-xl font-bold"
            >
              RungLey
            </a>
            <Navigation />
          </NavbarLeft>
          <NavbarRight>
            <SearchForm/>
            <ModeToggle /> 
          <Button variant="secondary" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button variant="default" asChild>
              <a href="/role-selection">Sign Up</a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>RungLey</span>
                  </a>
                  <a
                    href="/register"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Getting Started
                  </a>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Components
                  </a>
                  <a
                    href="/"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
    </>
  );
}
