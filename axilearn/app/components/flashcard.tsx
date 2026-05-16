import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";


export default function Flashcard() {
  return (
    <div className="flex justify-center p-4">
      <Card className="aspect-square w-88 max-w-full rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
        <CardHeader className="pb-0">
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Verb
          </CardTitle>
          <CardAction className="text-slate-400">*</CardAction>
          <CardDescription className="sr-only">Flashcard front</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <h2 className="text-5xl font-semibold tracking-tight text-slate-900">aprender</h2>
          <p className="text-sm text-slate-500">/a.pren'der/</p>
        </CardContent>

        <CardFooter className="justify-center pt-0 text-sm text-slate-500">
          Tap to reveal
        </CardFooter>
      </Card>
    </div>
  );
}
