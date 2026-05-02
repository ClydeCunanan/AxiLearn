import React from "react";

export default function Page() {
  const rows = [1, 2, 3];

  return (
    <section className="px-4 pt-3 pb-8">
      <h1 className="h1 text-black">Saved Exercises</h1>

      <div className="mt-4 space-y-4">
        {rows.map((row) => (
          <div key={row} className="h-22 w-full overflow-hidden rounded-2xl bg-transparent">
            <div className="flex h-full w-full">
              <div className="w-[32%] bg-neutral-700" />
              <div className="flex-1 bg-neutral-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}