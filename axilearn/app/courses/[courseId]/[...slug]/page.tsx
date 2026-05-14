import { getFilebyId } from "@/lib/canvas";
import File from "@/app/components/file";
import Generate from "@/app/components/generate";
import { getCourseById, getPagebyId } from "@/lib/canvas";
import Link from "next/link";
export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string; slug: string[] }>;
}) {
  const { courseId, slug } = await params;

  
   if (slug[0] === "file") {
    const fileUrl = slug[1];
    const file = await getFilebyId(courseId, fileUrl);
    const src = `/api?canvasUrl=${encodeURIComponent(file.url)}`;
    if (slug[2] === "generate") {
     return <Generate courseId={courseId} slug={slug} title={file.display_name} />;
  } 
    return (
      <div style={{ height: "100vh" }}>
        <File src={src} />
        <Link
          href={`/courses/${courseId}/${slug[0]}/${slug[1]}/generate`}
          className="btn-primary"
        >
       Generate Flashcards
        </Link>      
      </div>
    );
  } 
  
  else if (slug[0] === "page") {
    const page_url = slug[1];
    const [course, page] = await Promise.all([
      getCourseById(courseId),
      getPagebyId(courseId, page_url),
    ]);
      if (slug[2] === "generate") {
     return <Generate courseId={courseId} slug={slug} title={page.title} />;
  } 
    return (
      <div className="space-y-6 px-4 py-5 sm:px-6 sm:py-6">
        <div className="space-y-2 border-l-4 border-red-600 pl-4">
          <h1 className="text-3xl font-bold text-foreground">{course.name}</h1>
          <h2 className="text-xl font-semibold text-red-600">{page.title}</h2>
        </div>
        <div
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body }}
        />
        <Link
          href={`/courses/${courseId}/${slug[0]}/${slug[1]}/generate`}
          className="btn-primary"
        >
          Generate Flashcards
        </Link>
      </div>
    );
  }
}
