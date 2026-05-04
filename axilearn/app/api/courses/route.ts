import { getFilebyId, getFetchConfig } from "@/lib/canvas";
import { NextResponse } from "next/server";


  const baseUrl = process.env.CANVAS_BASE_URL


export async function getBlobURL(
 request: Request,
 { params }: { params: Promise<{ courseId: string; fileUrl: string }> }
) {
 const { courseId, fileUrl } = await params;

 const file = await getFilebyId(courseId, fileUrl);

    const res = await fetch(
      `${baseUrl}/api/v1/courses/${courseId}/files/${file.url}`,
      getFetchConfig(),
    )
    if (!res.ok) {
      throw new Error('Failed to fetch pdf content')
    }
     const buffer= await res.arrayBuffer()
const blob = new Blob([buffer], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  
  return NextResponse(blobUrl)
}
