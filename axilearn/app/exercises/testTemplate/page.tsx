import Flashcard from "@/app/components/flashcard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Ellipsis } from "lucide-react";

 
export default function page() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-10 pt-2">
      <header className="mb-6">
        <div className="mb-6 flex items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full bg-slate-100 text-slate-700 shadow-none hover:bg-slate-200"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
              Spanish · A2
            </p>
            <h1 className="text-xl font-semibold text-slate-900">
              Everyday Verbs
            </h1>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="rounded-full bg-slate-100 text-slate-700 shadow-none hover:bg-slate-200"
          >
            <Ellipsis className="size-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>7 of 24</span>
            <span>29%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[29%] rounded-full bg-slate-900" />
          </div>
        </div>
      </header>

      <div className="flex justify-center">
        <Flashcard />
      </div>
    </div>
  );
}
