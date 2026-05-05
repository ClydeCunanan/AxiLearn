
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent }from "@/components/ui/accordion"
import { getCourseById, getCourseModules} from "@/lib/canvas"
import Link from "next/link"
export default async function Page({ params }: { params: Promise<{ courseId: string }> } ) {
  const { courseId } = await params
  const [course, modules] = await Promise.all([
    getCourseById(courseId),
   getCourseModules(courseId)
  ]);

  return (
    <div className="space-y-5 px-4 py-5 text-slate-100 sm:px-6 sm:py-6">
      <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">{course.name}</h1>
      <div>
        <Accordion type="multiple" className="w-full overflow-visible rounded-3xl border border-white/10 bg-slate-950/90 shadow-[0_24px_70px_rgba(2,6,23,0.35)]">
        {modules.map((module) => (
          <AccordionItem key={module.id} value = {module.title} className="border-b border-white/10 px-1 last:border-b-0 data-[state=open]:bg-white/5">
           <AccordionTrigger className="px-4 py-4 text-left text-base font-medium text-slate-100 no-underline hover:no-underline sm:px-5">{module.title}</AccordionTrigger>
           <AccordionContent className="px-4 sm:px-5">
            <div className="mb-3 h-px bg-white/10" />
             {module.items.map((item) => (
              <Link
                key={item.id}
                href={`/courses/${courseId}/file/${encodeURIComponent(String(item.contentId ?? item.id))}`}
                className="mb-2 block rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-slate-100 shadow-sm shadow-black/10 last:mb-0"
              >
                <h3 className="text-sm font-medium leading-5 text-slate-50">{item.title}</h3>
              </Link>
            ))}
            </AccordionContent>
          </AccordionItem>
        ))}
        </Accordion>

       
      </div>
    </div>
  )
}