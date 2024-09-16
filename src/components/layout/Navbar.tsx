"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Package2, Menu, Search, CircleUser } from "lucide-react";
import { useAuth } from "../AuthProvider";
import { Button } from "../ui/button";
import { SheetTrigger, SheetContent, Sheet } from "../ui/sheet";
import { Input } from "../ui/input";
import Link from "next/link";
import NavLinks, { NonUserLinks } from "./NavLinks";
import BrandLink from "./BrandLink";
import MobileNavbar from "./MobileNavbar";
import AccountDropdown from "./AccountDropdown";

export default function Navbar({ className }: any) {
  const auth = useAuth();
  const finalClass = className
    ? className
    : "sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6";

  return (
    <header className={finalClass}>
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <BrandLink displayName={true} />
        {NavLinks.map((navItem, idx) => {
          const shouldDisplay = auth?.isAuthenticated === navItem.authRequired;

          return !shouldDisplay ? null : (
            <Link
              key={`nav-link-a-${idx}`}
              href={navItem.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {navItem.label}
            </Link>
          );
        })}
      </nav>
      <MobileNavbar />
      <div className="md:hidden">
        <BrandLink displayName={true} />
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>

        {auth?.isAuthenticated ? (
          <div className="ml-auto">
            <AccountDropdown />
          </div>
        ) : (
          <div className="ml-auto space-x-2">
            {NonUserLinks.map((navItem, idx) => {
              const shouldDisplay =
                auth?.isAuthenticated === navItem.authRequired;

              return shouldDisplay ? null : (
                <Link
                  key={`nav-link-d-${idx}`}
                  href={navItem.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {navItem.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
