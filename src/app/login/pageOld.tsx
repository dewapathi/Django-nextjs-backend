"use client";

import { useAuth } from "@/components/AuthProvider";

const LOGIN_URL = "/api/login/";

export default function Loginn() {
  const auth = useAuth();

  const handldeSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const ObjectValues = Object.fromEntries(formData);
    const jsonData = JSON.stringify(ObjectValues);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const response = await fetch(LOGIN_URL, requestOptions);
    const data = await response.json();

    if (response.ok) {
      console.log("Login in");
      auth?.login();
    }
  };

  return (
    <div className="h-[95vh]">
      <div className="max-w-md mx-auto py-5">
        <h1>Login here</h1>
        <form onSubmit={handldeSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Your Username"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
