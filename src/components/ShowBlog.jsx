'use client'
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineJavaScript } from "react-icons/ai";
// Import the React icon
import { FaPython, FaReact } from 'react-icons/fa';

const ShowBlog = ({blogs}) => {

    const [toggle,setToggle]=useState("javascript")

    const filterBlog=blogs.filter(blog=>blog.category===toggle)

  return (
    <div className="top-32 min-h-screen py-10 px-4">
      {/* 1. UPDATED HEADING TEXT */}
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        Latest Code Blogs 💡
      </h1>

      <div className="flex justify-center items-center my-3">
  <div className="flex space-x-2 bg-gray-900 p-2 rounded-full shadow-lg flex-wrap lg:space-y-0 md:space-y-0 sm:space-y-2 space-y-2 justify-center">
    <button
    onClick={()=>setToggle('javascript')}
     className={`px-5 py-2 flex items-center gap-3 rounded-full text-sm font-medium ${toggle==='javascript'?'bg-white text-black':'text-gray-300 hover:text-white hover:bg-white/10'}   transition-all duration-200`}
    >
      JavaScript <AiOutlineJavaScript  className="ml-2 text-yellow-400 text-2xl" />
    </button>

    <button
     onClick={()=>setToggle('python')}
      className={`px-5 py-2 flex items-center gap-3 rounded-full text-sm font-medium ${toggle==='python'?'bg-white text-black':'text-gray-300 hover:text-white hover:bg-white/10'}   transition-all duration-200`}
    >
      Python    <FaPython  className="ml-2 text-blue-400 text-2xl" />
    </button>

    <button
     onClick={()=>setToggle('react js')}
    className={`px-5 py-2 flex items-center gap-3 rounded-full text-sm font-medium ${toggle==='react js'?'bg-white text-black':'text-gray-300 hover:text-white hover:bg-white/10'}   transition-all duration-200`}
    >
      React  <FaReact className="ml-2 text-indigo-400 text-2xl" />
    </button>
  </div>
</div>


    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {filterBlog?.map((blog) => (
    <div
      key={blog._id}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] hover:shadow-indigo-500/20 transition-transform duration-300 flex flex-col"
    >
      {/* Image */}
      <img
        src={blog.image}
        alt={blog.name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="inline-block bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          {blog.category}
        </span>

        {/* 2. ADDED REACT ICON */}
        <h2 className="text-xl font-bold text-white mt-2 flex items-center">
            {blog.name}
            {/* Conditional Icon Rendering */}
            {blog.category === 'react js' && (
                <FaReact className="ml-2 text-indigo-400 text-2xl" />
            )}
             {blog.category === 'javascript' && (
                <AiOutlineJavaScript  className="ml-2 text-yellow-400 text-2xl" />
            )}
             {blog.category === 'python' && (
                <FaPython  className="ml-2 text-blue-400 text-2xl" />
            )}
        </h2>

        <p className="text-gray-400 text-sm mt-2 line-clamp-3 flex-grow">
          {blog.detils?.slice(0, 120)}...
        </p>

        {/* Button (stick to bottom) */}
        <Link href={`/blog/${blog._id}`} className="mt-auto">
          <button className="w-full mt-3 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition">
            Read More →
          </button>
        </Link>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default ShowBlog;