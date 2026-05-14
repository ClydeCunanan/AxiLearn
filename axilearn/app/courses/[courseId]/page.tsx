import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getCourseById, getCourseModules } from "@/lib/canvas";
import Link from "next/link";
export default async function Page({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const [course, modules] = await Promise.all([
    getCourseById(courseId),
    getCourseModules(courseId),
  ]);

  return (
    <div className="space-y-4 px-4 py-5 sm:px-6 sm:py-6">
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          Course modules
        </p>
        <h1 className="h1 px-0 pb-0 pt-0 text-balance">{course.name}</h1>
      </div>

      <div className="rounded-2xl bg-card shadow-ios ring-1 ring-border/70">
        <Accordion type="multiple" className="w-full">
          {modules.map((module) => (
            <AccordionItem
              key={module.id}
              value={module.title}
              className="border-border/70 px-2 last:border-b-0 data-[state=open]:bg-muted/40"
            >
              <AccordionTrigger className="px-3 py-4 text-left text-base font-medium text-foreground no-underline hover:no-underline sm:px-4">
                {module.title}
              </AccordionTrigger>
              <AccordionContent className="px-3 pb-4 sm:px-4">
                <div className="mb-3 h-px bg-border/70" />
                <div className="space-y-2">
                  {module.items.map((item) => {
                    if (item.type === "subheader" || item.type === "quiz") {
                      return (
                        <div
                          key={item.id}
                          className="rounded-xl bg-muted px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70"
                        >
                          {item.title}
                        </div>
                      );
                    }
                    //THIS if is for returning items without links like subheaders
                    const href =
                      item.pageUrl == null
                        ? `/courses/${courseId}/file/${encodeURIComponent(String(item.contentId ?? item.id))}`
                        : `/courses/${courseId}/page/${encodeURIComponent(item.pageUrl)}`;

                    return (
                      <Link
                        key={item.id}
                        href={href}
                        className=" block rounded-xl border border-border/70 bg-background px-3 py-3 text-foreground shadow-sm transition-colors hover:bg-muted/70"
                      >
                        <h3 className=" text-sm font-medium leading-5">
                          {item.title}
                        </h3>
                      </Link>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
