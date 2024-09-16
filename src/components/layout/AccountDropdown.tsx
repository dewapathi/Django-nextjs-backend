"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@radix-ui/react-dropdown-menu";
import { CircleUser } from "lucide-react";
import { useAuth } from "../AuthProvider";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function AccountDropdown({ className }: any) {
  const auth = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="cursor-pointer">
        <DropdownMenuLabel>
          {auth?.username ? auth?.username : "Account"}
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={(e) => router.push("/logout")}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
