import React from 'react'
import ChatInput from "../components/chatinput"

export default function page() {
  return (
    <div className = "hau-maroon">
      <main className="flex-1 px-6 pt-8">
        <h1 className="text-gray-900 text-3xl font-semibold leading-tight">
          Hi, What do
          <br />
          you want to
          <br />
          learn about?
        </h1>
      </main>
      <ChatInput />
    </div>
  )
}


