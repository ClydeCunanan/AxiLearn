"use client";
import React from "react";
import { createMessage, doSubmit } from "../actions";
import { ArrowUp, Code2, Image as ImageIcon, Mic } from "lucide-react";

interface Message {
  id: string;
  role: string;
  text: string;
}     

export default function ChatInput() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [conversationId, setConversationId] = React.useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    e.currentTarget.reset();
    const message = formData.get("message");

    if (typeof message !== "string" || message.trim() === "") {
      alert("Please enter a valid message.");
      console.log(typeof message);
      return;
    }

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage, id: crypto.randomUUID() },
    ]);

    const result = await createMessage(conversationId, userMessage);

    if (result.success == false || result.conversationId == null) {
      console.log(" Failed to create message or conversation.");
      return;
    }

    if (!conversationId) {

      setConversationId(result.conversationId)
   console.log("successfully created new conversation with id: ", result.conversationId);
     ;
    }

    const aiResponse = await doSubmit(userMessage);

    if (typeof aiResponse !== "string" || aiResponse.trim() === "") {
      alert("Type of AI Response not string.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      { role: "ai", text: aiResponse, id: crypto.randomUUID() },
    ]);

    await createMessage(conversationId, aiResponse);
       console.log("successful ai reply with id: ", result.conversationId);

  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-4 flex flex-col justify-end gap-3 padding">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`rounded-lg p-2 ${message.role === "user" ? "self-end bg-white/10" : "self-start bg-white/20"}`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-white/14 bg-white/6 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      >
        <label htmlFor="message" className="sr-only">
          Ask a question
        </label>

        <input
          id="message"
          name="message"
          placeholder="What would you like to know?"
          className="mb-3 w-full bg-transparent text-[0.95rem] text-white placeholder:text-white/38 outline-none"
        />

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-white/60">
            <button
              type="button"
              aria-label="Attach image"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/6 transition hover:bg-white/10"
            >
              <ImageIcon size={16} />
            </button>
            <button
              type="button"
              aria-label="Insert code"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/6 transition hover:bg-white/10"
            >
              <Code2 size={16} />
            </button>
            <button
              type="button"
              aria-label="Voice input"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/6 transition hover:bg-white/10"
            >
              <Mic size={16} />
            </button>
          </div>

          <button
            type="submit"
            aria-label="Send message"
            className="grid h-11 w-11 place-items-center rounded-full bg-white text-slate-950 transition hover:scale-105 hover:bg-white/90 active:scale-95"
          >
            <ArrowUp size={18} strokeWidth={2.6} />
          </button>
        </div>
      </form>
    </div>
  );
}
