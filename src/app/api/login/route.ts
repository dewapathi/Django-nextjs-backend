"use server";

import {
  getRefreshToken,
  getToken,
  setRefreshToken,
  setToken,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import ApiProxy from "../proxy";
import { DJANAGO_API_ENDPOINT } from "@/config/defaults";

const DJNAGO_API_LOGIN_URL = `${DJANAGO_API_ENDPOINT}/token/pair`;

export async function POST(request: Request) {
  const myAuthToken = getToken();
  const myRefreshToken = getRefreshToken();

  const requestData = await request.json();
  const jsonData = JSON.stringify(requestData);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };
  const response = await fetch(DJNAGO_API_LOGIN_URL, requestOptions);
  const responseData = await response.json();

  if (response.ok) {
    const { username, access, refresh } = responseData;

    setToken(access);
    setRefreshToken(refresh);
    return NextResponse.json(
      { LoggedIn: true, username: username },
      { status: 200 }
    );
  }
  return NextResponse.json(
    { LoggeIn: false, ...responseData },
    { status: 400 }
  );
}
