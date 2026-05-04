import dynamic from 'next/dynamic';
import { getFilebyId } from "@/lib/canvas";

import { PDFViewer } from '@embedpdf/react-pdf-viewer';


export default async function page(
 request: Request,
 { params }: { params: Promise<{ courseId: string; fileUrl: string }> }
) {
 const { courseId, fileUrl } = await params;

 const file = await getFilebyId(courseId, fileUrl);
 const src = file.downloadUrl

 return (
   <div>
     <h1>{file.displayName}</h1>
     <div style={{ height: '80vh' }}>
       <PDFViewer config={{ src }} />
     </div>
   </div>
 );
}
