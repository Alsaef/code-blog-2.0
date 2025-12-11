'use client';
import { AuthContext } from '@/Provider/AuthProvider';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CommentSection = ({id}) => {
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext)

   const { isPending, isError, data:commentData=[], error, refetch } = useQuery({
    queryKey: ['todos'],
    queryFn: async()=>{
     const res=await axios.get(`${process.env.NEXT_PUBLIC_URI_API}/api/v1/comment`)
     return res.data

    },
  })

  const filterComments=commentData?.filter(comment=>comment.postId===id)

    const handleAddComment = () => {
    
    const commentDataObj = {
    name:user?.displayName,
    email: user?.email,
    comments: text.trim(),
    postId: id
  };

   axios.post(`${process.env.NEXT_PUBLIC_URI_API}/api/v1/comment`,commentDataObj)
   .then(data=>{
    console.log(data.data);
    setText('')
    refetch()
   }).catch(error=>console.log(error.message))
   
  };
  return (
    <div className="flex justify-center ilg:tems-start items-center">
      <div className="w-full lg:max-w-2xl  bg-gray-900 border border-gray-800 rounded-xl p-5 shadow-lg">
        {/* Title */}
        <h2 className="text-xl font-semibold text-white mb-4">
          💬 Comments ({filterComments?.length})
        </h2>

        {
          user ? <>  {/* Input box */}
            <div className="flex items-center gap-3 mb-5">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddComment}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-all"
              >
                Post
              </button>
            </div>

            {/* Comments box */}
            <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
              {filterComments.length === 0 ? (
                <p className="text-gray-400 text-sm text-center">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                filterComments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-800 border border-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-blue-400 font-semibold">{comment?.name}</h4>
                      <span className="text-gray-500 text-xs">{comment.time}</span>
                    </div>
                    <p className="text-gray-200 text-sm">{comment.comments}</p>
                  </div>
                ))
              )}
            </div></> : <div className="flex items-center justify-center h-10 rounded bg-gray-100 shadow-md">
      <Link
        href="/login"
        className="text-blue-600 font-semibold text-lg hover:underline hover:text-blue-700 transition duration-200"
      >
        Please login
      </Link>
    </div>
        }
      </div>
    </div>
  );
};

export default CommentSection;
