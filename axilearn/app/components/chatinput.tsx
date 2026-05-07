"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function ChatInput() {
    const [message, setMessage] = React.useState("");

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault(); setMessage(e.target.value);
        console.log("hello");
    
    }


  return (
    <div>
        <form onSubmit = {handleSubmit}>
        <input type = "text" placeholder="Type your message here." /> 
        <button type="submit">Send</button>
        </form>
    </div>
  )
}

