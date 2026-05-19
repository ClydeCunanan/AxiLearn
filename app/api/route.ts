import { getFetchConfig } from "@/lib/canvas";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // 1. Extract the URL from the query parameters (?canvasUrl=...)
  const { searchParams } = new URL(request.url);
  //new url converts the url string into object parts, 
//   in this case we're getting searchParams
  const canvasUrl = searchParams.get("canvasUrl");
  console.log("route triggered")
  if (!canvasUrl) {
    return new Response("Missing canvasUrl parameter", { status: 400 });
  }

  try {
    
    const res = await fetch(canvasUrl, getFetchConfig());

    if (!res.ok) {
      return new Response("Failed to fetch content from Canvas", { status: res.status });
    }

    const buffer = await res.arrayBuffer();
    
    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline', // Ensures it opens in the viewer, doesn't just download
        'Cache-Control': 'no-store',    // Keeps data fresh for student files
      },
    });
  } catch (error) {
    console.error("PDF Proxy Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}