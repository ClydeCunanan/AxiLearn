"use client";
import { Search } from "lucide-react";
import { useState } from "react";

type SearchBarProps = {
  query: string;
  setQuery: (value: string) => void;
};

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center w-72 h-11 rounded-lg bg-gray-400 mx-auto "
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="   Course Name"
         className = "flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500"
      />
      <button type="submit">
        <Search />
      </button>
    </form>
  );
}
