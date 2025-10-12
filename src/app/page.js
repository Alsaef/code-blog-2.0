
import FancySearchBar from '@/components/FancySearchBar';
import Loading from '@/components/Loading';
import ShowBlog from '@/components/ShowBlog';
import React, { Suspense } from 'react';

const page = async() => {

  console.log(process.env.NEXT_PUBLIC_URI_API);
   const res = await fetch(
    `${process.env.NEXT_PUBLIC_URI_API ||"https://codeblog-server.vercel.app"}/api/v1/blog`,
    { cache: "no-store" }
  );
  const blogs = await res.json();


  return (
    <div>
     <Suspense fallback={<Loading></Loading>}>
       <ShowBlog blogs={blogs}></ShowBlog>
     </Suspense>
    </div>
  );
};

export default page;