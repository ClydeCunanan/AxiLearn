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
        <div className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
            <div className="space-y-2 border-l-4 border-red-600 pl-4">
                <h1 className="text-3xl font-bold text-foreground">{course.name}</h1>
                <h2 className="text-xl font-semibold text-red-600">{page.title}</h2>
            </div>
            <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: page.body }} />
            <button>Create Module</button>
        </div>
    )
}
