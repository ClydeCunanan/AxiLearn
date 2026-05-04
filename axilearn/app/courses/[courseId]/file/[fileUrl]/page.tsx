import dynamic from 'next/dynamic';
import {getBlobURL} from "@/lib/canvas";

import { PDFViewer } from '@embedpdf/react-pdf-viewer';




export default async function page(
 request: Request,
 { params }: { params: Promise<{ courseId: string; fileUrl: string }> }
) {
 const { courseId, fileUrl } = await params;

    const src = await getBlobURL(courseId, fileUrl);
 return (
   <div>
     <div style={{ height: '80vh' }}>
       <PDFViewer config={{ src }} />
     </div>
   </div>
 );
}
