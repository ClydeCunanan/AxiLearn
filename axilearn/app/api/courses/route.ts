import {
  RawFile,
  CleanFile,
} from '@/types/index.js'

import {getFetchConfig} from '@/lib/canvas'

export async function getFilebyId(courseId: string, fileUrl: string) {
  const baseUrl = process.env.CANVAS_BASE_URL

  // const queryParams = new URLSearchParams()
  // queryParams.append('per_page', '50')
  // queryParams.append('module_item_id[]', 'number')


  try {
    const encoded = encodeURIComponent(fileUrl)
    const res = await fetch(
      `${baseUrl}/api/v1/courses/${courseId}/files/${encoded}`,
      getFetchConfig(),
    )

    if (!res.ok) {
      throw new Error('Failed to fetch pdf content')
    }

    const file: RawFile = await res.json()
    const cleanFile: CleanFile = {
      id: file.id.toString(),
      displayName: file.display_name,
      fileName: file.filename,
      contentType: file['content-type'],
      downloadUrl: file.url,
      isPdf:
        file['content-type'] === 'application/pdf' ||
        file.filename.toLowerCase().endsWith('.pdf'),
    }
    return cleanFile
    
  } catch (error) {
    console.log(error)
    throw new Error('Internal Server Error') 
  }
}