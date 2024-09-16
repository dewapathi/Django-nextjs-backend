import { NextResponse } from "next/server";
import ApiProxy from "../proxy";
import { DJANAGO_API_ENDPOINT } from "@/config/defaults";

const DJANGO_API_WAITLISTS_URL = `${DJANAGO_API_ENDPOINT}/waitlists/`;

export async function GET() {
  const { data, status } = await ApiProxy.get(DJANGO_API_WAITLISTS_URL, true);

  return NextResponse.json(data, { status: status });
}

export async function POST(request: { json: () => any }) {
  const requestData = await request.json();
  const jsonData = JSON.stringify(requestData);

  const { data, status } = await ApiProxy.post(
    DJANGO_API_WAITLISTS_URL,
    jsonData,
    true
  );

  return NextResponse.json(data, { status: status });
}
