import CommentSection from '@/components/CommentSection';
import Spech from '@/components/Spech';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const page = async({params}) => {
  let id=params?.id
  
   const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI_API}/api/v1/blog/${params?.id}`,
    { cache: "no-store" }
  );
  const blog = await res.json();

 
    return (
     <div>
  {/* Back button */}
  <div className="mx-auto w-[90%] md:w-[59%]">
    <Link href={'/'}>
      <button className="btn my-8 btn-lg btn-primary flex items-center gap-2">
        <FaArrowLeft /> Back To Home
      </button>
    </Link>
  </div>

  {/* Blog details + comment */}
  <div className="min-h-screen text-white flex lg:flex-row flex-col justify-center lg:items-start items-center gap-5 p-4 md:p-6">
    <div className="max-w-3xl w-full bg-gray-900 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
      
      {/* Blog title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-white p-4 md:p-6 border-b border-gray-700">
        {blog?.name}
      </h1>

      {/* Blog image */}
      <img
        src={blog?.image}
        alt={blog?.name}
        className="w-full h-60 md:h-72 object-cover"
      />

      {/* Blog details */}
      <div className="p-4 md:p-6 text-white whitespace-pre-line leading-relaxed">
        {blog?.detils}
      </div>

 {/* <Spech details={blog.detils}></Spech> */}
      {/* Code Example */}
      {blog?.codeExample && (
        <div className="mockup-code w-full bg-black border-t border-gray-700 overflow-x-auto rounded-b-xl">
          <div className="min-w-[350px] sm:min-w-full">
            {blog.codeExample.split("\n").map((line, idx) => (
              <pre
                key={idx}
                data-prefix=">"
                className="text-green-400 text-sm px-2 md:px-4 py-0.5 whitespace-pre overflow-x-auto"
              >
                <code>{line}</code>
              </pre>
            ))}
          </div>
         
        </div>
      )}
    </div>

    <CommentSection id={id} />
  </div>
</div>

    );
};

export default page;