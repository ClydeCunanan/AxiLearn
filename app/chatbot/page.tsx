import React from 'react'
import ChatInput from "../components/chatinput"

export default function page() {
  return (
    <section className="relative flex min-h-full flex-col overflow-hidden bg-[#0b1020] px-5 pt-7 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,215,0,0.08),transparent_28%)]" />

      <main className="relative flex flex-1 flex-col">
        <div className="max-w-60 pt-1">
          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.32em] text-white/45">
            Axi Learn
          </p>
          <h1 className="text-[2.1rem] font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-[2.4rem]">
            Hi, what do
            <br />
            you want to
            <br />
            learn about?
          </h1>
        </div>

        <div className="mt-auto pb-1">
          <ChatInput />
        </div>
      </main>
    </section>
  )
}


