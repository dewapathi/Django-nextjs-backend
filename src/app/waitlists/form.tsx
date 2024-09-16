"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

const WAITLIST_API_URL = "/api/waitlists/";

export default function WaitlistForm() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handldeSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataValues = Object.fromEntries(formData);
    const jsonData = JSON.stringify(formDataValues);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const response = await fetch(WAITLIST_API_URL, requestOptions);

    if (response.ok) {
      setMessage("Thank you for joining!");
      setErrors([]);
    } else {
      const data = await response.json();
      if (!data.email)
        setError("There was an error with your request. Please try again!");
      setErrors(data.email);
      setMessage("");
    }
  };

  return (
    <div className="grid gap-4">
      <form onSubmit={handldeSubmit} className="space-y-4">
        <div>{message && message}</div>
        {error && (
          <div className="rounded-md text-white bg-destructive p-3 font-semibold text-sm">
            {error && error}
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div
            className={error ? "rounded-lg p-3 border border-destructive" : ""}
          >
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
            />
            {errors[0] && (
              <div className="p-1 text-sm bg-destructive text-center text-white">
                {errors.map((err, idx) => {
                  return <p key={idx}>{err.message}</p>;
                })}
              </div>
            )}
          </div>
        </div>
        <Button type="submit" className="w-full mt-4">
          Join waitlist
        </Button>
      </form>
    </div>
  );
}
