import { NextResponse } from "next/server";
import { getSearchDataJson } from "@/lib/search-data";

export async function GET() {
  return new NextResponse(getSearchDataJson(), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
}
