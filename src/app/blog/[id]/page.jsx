import CommentSection from '@/components/CommentSection';
import Spech from '@/components/Spech';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

export async function generateMetadata({ params }) {
  try {
    const id = params?.id;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URI_API}/api/v1/blog/${id}`,
      { cache: "no-store" }
    );
    const blog = await res.json();

    
    if (!blog || !blog.name) {
      return {
        title: "Blog Not Found",
        description: "The blog post you are looking for does not exist.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    
    const description = blog.detils
      ? blog.detils.substring(0, 155) + "..."
      : "Read this amazing blog post from our site.";

    const canonicalUrl = `https://code-blog-2-0.vercel.app/blog/${id}`;
    const imageUrl =
      blog.image?.trim() ||
      "https://developer-ratul.netlify.app/assets/my-bg-02d338d3.png";

   
    return {
      title: `${blog.name} | Code Blog`,
      description,
      keywords: [
        blog.category,
        "JavaScript",
        "Web Development",
        "React",
        "Next.js",
        "Programming",
      ],

      alternates: {
        canonical: canonicalUrl,
      },

      openGraph: {
        title: blog.name,
        description,
        url: canonicalUrl,
        type: "article",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.name,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: blog.name,
        description,
        images: [imageUrl],
      },

      robots: {
        index: true, 
        follow: true, 
      },

      // ✅ JSON-LD Structured Data for Google
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": blog.name,
          "description": description,
          "image": [imageUrl],
          "author": {
            "@type": "Person",
            "name": blog.author || "Al Saef Ratul",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Code Blog",
            "logo": {
              "@type": "ImageObject",
              "url": "https://developer-ratul.netlify.app/assets/my-bg-02d338d3.png",
            },
          },
          "datePublished": blog.createdAt,
          "dateModified": blog.updatedAt,
          "articleSection": blog.category,
          "url": canonicalUrl,
          "mainEntityOfPage": canonicalUrl,
        }),
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error",
      description: "Could not load blog post details.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}




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

   {
  blog?.link && (
    <div className="p-4 md:p-4">
      <a
        href={blog.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-semibold underline hover:text-blue-800 transition-all duration-300"
      >
        🔗 Read the Full Blog Post Here
      </a>
    </div>
  )
}


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