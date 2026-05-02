
import { CourseDetail } from "@/types/index"
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent }from "@/components/ui/accordion"

async function getCourseDetail(courseId: string): Promise<CourseDetail> {   
  const LOCAL_URL = 'http://localhost:3000'

  try {
    const res = await fetch(`${LOCAL_URL}/api/courses/${courseId}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      throw new Error(`HTTP Code: ${res.status}`); 
    }
    // can put res.status to see which error code 
    return res.json()
  }
  catch (error) {
    console.log(error)
    return { course: { id: 0, title: 'Error' }, modules: [] }
  }
}
// use params when you need to create dynamic URL
//  like courseId, you need to await this and add Promise<> 
// too within the function parameters -->

export default async function Page({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = await params
  const { course, modules } = await getCourseDetail(courseId)

  return (
    <div className="space-y-5 px-4 py-5 text-slate-100 sm:px-6 sm:py-6">
      <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">{course.title}</h1>
      <div>
        <Accordion type="multiple" className="w-full overflow-visible rounded-3xl border border-white/10 bg-slate-950/90 shadow-[0_24px_70px_rgba(2,6,23,0.35)]">
        {modules.map((module) => (
          <AccordionItem key={module.id} value = {module.title} className="border-b border-white/10 px-1 last:border-b-0 data-[state=open]:bg-white/5">
           <AccordionTrigger className="px-4 py-4 text-left text-base font-medium text-slate-100 no-underline hover:no-underline sm:px-5">{module.title}</AccordionTrigger>
           <AccordionContent className="px-4 sm:px-5">
            <div className="mb-3 h-px bg-white/10" />
             {module.items.map((item) => (
              <div key={item.id} className="mb-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-slate-100 shadow-sm shadow-black/10 last:mb-0">
                <h3 className="text-sm font-medium leading-5 text-slate-50">{item.title}</h3>
              </div>
            ))}
            </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>

       
      </div>
    </div>
  )
}