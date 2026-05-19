'use client'

import React from "react";
import { Home, Package, Book, Zap, User } from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "/  ", icon: Home },
  { name: "Courses", href: "/courses", icon: Package },
  { name: "Exercises", href: "/exercises", icon: Book },
  { name: "Chatbot", href: "/chatbot", icon: Zap },
  { name: "Profile", href: "/profile", icon: User }
]


export default function Nav() {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-50 border-gray-300 bg-hau-maroon px-4 py-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.75rem)" }}
    >
      <div className="mx-auto flex w-full items-center justify-around">

            
        {navItems.map((item) => {
          const IconComponent = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col fill-white items-center gap-1 text-xs text-white transition-colors hover:text-gray-900"
            >  
            {/*  */}
              <IconComponent size={24} />
           
            </Link>
          );
        })}
        
      </div>
    </nav>
  );
}
