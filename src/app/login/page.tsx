"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/AuthProvider";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

const LOGIN_URL = "/api/login/";

export default function Login() {
  const auth = useAuth();

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

    const response = await fetch(LOGIN_URL, requestOptions);
    console.log("response", response);

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
    if (response.ok) {
      auth?.login(data?.username);
    } else {
      console.log(await response.json());
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[85vh] lg:grid-cols-2 xl:min-h-[90vh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your username below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handldeSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  placeholder=""
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center mt-6">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full mt-4">
                Login
              </Button>
              <Button variant="outline" className="w-full mt-4">
                Login with Google
              </Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/images/scorpion_2.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
