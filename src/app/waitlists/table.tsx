"use client";

import { useAuth } from "@/components/AuthProvider";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = async (url: string | URL | Request) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.message = await res.json();
    throw error;
  }

  return res.json();
};

const WAITLIST_API_URL = "/api/waitlists/";

export default function TableDemo() {
  const auth = useAuth();
  const router = useRouter();
  const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);

  useEffect(() => {
    if (error) {
      auth?.logingRequiredRedirect();
    }
  }, [auth, error]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <Table>
      <TableCaption>A list of your recent requests</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-">Id</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any, idx: number) => {
          return (
            <TableRow
              className="cursor-pointer"
              key={`item-${idx}`}
              onClick={(e) => router.push(`/waitlists/${item.id}`)}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow></TableRow>
      </TableFooter>
    </Table>
  );
}
