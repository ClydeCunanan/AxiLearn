'use client'
import { PDFViewer } from '@embedpdf/react-pdf-viewer'
export default function File({src}: {src: string}) {
  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer config={{ src }} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}