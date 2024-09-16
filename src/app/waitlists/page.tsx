"use client";

import WaitlistForm from "./form";
import TableDemo from "./table";

// const fetcher = (...args: [RequestInfo, RequestInit?]) =>
//   fetch(...args).then((res) => res.json());

export default function Waitlist() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WaitlistForm />
      <TableDemo />
    </main>
  );
}
