"use client";
import useSWR from "swr";
import { useAuth } from "@/components/AuthProvider";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import WaitlistForm from "./waitlists/form";

export default function Home() {
  const auth = useAuth();

  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "http://127.0.0.1:8000/api/hello",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <WaitlistForm />
      </div>
      <div className="mt-10 border border-collapse">
        <div className="flex items-center justify-center">
          {auth?.isAuthenticated ? "Hello Lakruwan" : "Hello guest"}
        </div>
        {/* <div className="flex items-center justify-center">
          {JSON.stringify(data)}
        </div> */}
        <div className="flex items-center justify-center">
          <ThemeToggleButton />
        </div>
      </div>
      {/* <div className="mt-40">
        {" "}
        {auth?.isAuthenticated ? <Logout /> : <Login />}
      </div> */}
    </main>
  );
}
