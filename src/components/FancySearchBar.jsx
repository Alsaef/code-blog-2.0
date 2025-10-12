// components/FancySearchBar.jsx
"use client";

import { useState } from "react";

export default function FancySearchBar() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
    
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto relative flex items-center top-44"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search...'
        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition outline-none text-gray-700"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
        />
      </svg>
      <button
        type="submit"
        className="absolute right-0 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-medium transition"
      >
        Search
      </button>
    </form>
  );
}
