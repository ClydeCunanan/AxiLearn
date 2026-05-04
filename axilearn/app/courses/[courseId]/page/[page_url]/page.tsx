import { getCourseById, getPagebyId } from "@/lib/canvas"

export default async function Page({
    params,
}: {
    params: Promise<{ courseId: string, page_url: string }>
})
 {
    const { courseId, page_url } = await params
     const [course, page] = await Promise.all([
        getCourseById(courseId),
       getPagebyId(courseId, page_url)
      ]);
    return (
        <div>
            <h1>{course.name}</h1>
            <h2>{page.title}</h2>
            <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: page.body }} />
                
        </div>
    )
}
