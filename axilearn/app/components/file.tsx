'use client'
import { PDFViewer } from '@embedpdf/react-pdf-viewer'
export default function File({src}: {src: string}) {
  return (
    <div>
      <div style={{ height: '80vh' }}>
        <PDFViewer config={{ src }} />
        hello
      </div>
    </div>
  )
}