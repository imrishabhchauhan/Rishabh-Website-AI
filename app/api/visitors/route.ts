import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://hits.sh/aiwithrishabh.com.svg", {
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch hits");
    }

    const svg = await response.text();
    // Extract the number from <title>hits: 123</title>
    const match = svg.match(/<title>hits:\s*([0-9,]+)<\/title>/);
    
    if (match && match[1]) {
      const count = parseInt(match[1].replace(/,/g, ""), 10);
      return NextResponse.json({ count });
    }
    
    return NextResponse.json({ count: null }, { status: 500 });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    return NextResponse.json({ count: null }, { status: 500 });
  }
}
