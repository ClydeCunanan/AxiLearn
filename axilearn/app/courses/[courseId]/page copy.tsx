
// import { CourseDetail } from "@/types/index"
// import {Accordion, AccordionItem, AccordionTrigger, AccordionContent }from "@/components/ui/accordion"

// async function getCourseDetail(courseId: string): Promise<CourseDetail> {   
//   const LOCAL_URL = 'http://localhost:3000'

//   try {
//     const res = await fetch(`${LOCAL_URL}/api/courses/${courseId}`, {
//       next: { revalidate: 3600 },
//     })
//     if (!res.ok) {
//       throw new Error(`HTTP Code: ${res.status}`); 
//     }
//     // can put res.status to see which error code 
//     return res.json()
//   }
//   catch (error) {
//     console.log(error)
//     return { course: { id: 0, title: 'Error' }, modules: [] }
//   }
// }
// // use params when you need to create dynamic URL
// //  like courseId, you need to await this and add Promise<> 
// // too within the function parameters -->

// export default async function Page({ params }: { params: Promise<{ courseId: string }> }) {
//     const { courseId } = await params
//   const { course, modules } = await getCourseDetail(courseId)

//   return (
//     <div className="space-y-4">
//       <h1>{course.title}</h1>
//       <div>
//         <Accordion type="multiple" className="w-full rounded-md border mb-2 overflow-visible">
//         {modules.map((module) => (
//           <AccordionItem key={module.id} value = {module.title} className="border p-4 rounded">
//            <AccordionTrigger>{module.title}</AccordionTrigger>
//            <AccordionContent>
//             items: {module.items.map((item) => (
//               <div key={item.id} className="border p-2 rounded mb-2">
//                 <h3>{item.title}</h3>
//               </div>
//             ))}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//         </Accordion>

       
//       </div>
//     </div>
//   )
// }