"use client";

import { useAuth } from "@/components/AuthProvider";

const LOGGED_OUT_URL = "/api/logout";

export default function Logout() {
  const auth = useAuth();

  const handldeLogout = async (e: any) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };
    const response = await fetch(LOGGED_OUT_URL, requestOptions);

    if (response.ok) {
      console.log("Logged out");
      auth?.logout();
    }
  };

  return (
    <div className="h-[95vh]">
      <div className="max-w-md mx-auto py-5">
        <h1>Are you sure? You want to logout</h1>

        <button className="bg-red-500 size-9 w-full" onClick={handldeLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
