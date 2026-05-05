import { getFilebyId } from '@/lib/canvas'
import File from '@/app/components/file'
export default async function Page({ params }: { params: Promise<{ courseId: string; fileUrl: string }> }) {
  const { courseId, fileUrl } = await params
  const file = await getFilebyId(courseId, fileUrl) // This should be an async call, but for simplicity, we're treating it as synchronous here. In a real implementation, you'd want to handle loading states and errors properly.
  
const src = `/api/pdf?canvasUrl=${encodeURIComponent(file.url)}`;
 console.log("hello");
  return (
      <div style={{ height: '80vh' }}>
        <File src={src} />
    <div>
        
      </div>
    </div>
  )
}