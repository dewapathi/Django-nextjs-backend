"use client";

import { Menu } from "lucide-react";
import { useAuth } from "../AuthProvider";
import { Button } from "../ui/button";
import { SheetTrigger, SheetContent, Sheet } from "../ui/sheet";
import Link from "next/link";
import NavLinks, { NonUserLinks } from "./NavLinks";
import BrandLink from "./BrandLink";

export default function MobileNavbar({ className }: any) {
  const auth = useAuth();

  return (
    <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <BrandLink
              displayName={true}
              className="flex items-center gap-2 text-lg font-semibold"
            />
            {NavLinks.map((navItem, idx) => {
              const shouldDisplay =
                auth?.isAuthenticated === navItem.authRequired;

              return !shouldDisplay ? null : (
                <Link
                  key={`nav-link-b-${idx}`}
                  href={navItem.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {navItem.label}
                </Link>
              );
            })}

            {auth?.isAuthenticated ? (
              <Link href="/logout" className="hover:text-foreground">
                Logout
              </Link>
            ) : (
              <>
                {NonUserLinks.map((navItem, idx) => {
                  const shouldDisplay =
                    auth?.isAuthenticated === navItem.authRequired;

                  return !shouldDisplay ? null : (
                    <Link
                      href={navItem.href}
                      key={`nav-link-c-${idx}`}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {navItem.label}
                    </Link>
                  );
                })}
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
  );
}
