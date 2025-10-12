'use client'
import React, { useContext } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Head from 'next/head';
import { AuthContext } from '@/Provider/AuthProvider';
import { useRouter } from 'next/navigation';

const SocialLogin = () => {
   const route=useRouter()
  const {user,googleSignIn}=useContext(AuthContext)
  const handelGoogle=()=>{
    googleSignIn()
    .then((result)=>{
      route.push('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
    return (
        <div>
        
            <div className="flex min-h-screen  items-center justify-center px-4">
      <div className="max-w-md w-full  rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">Welcome Back</h1>
        <p className="text-center text-gray-500">Sign in with your social account</p>

        <div className="flex flex-col gap-4">
          {/* Google Login Button */}
          <button
          onClick={handelGoogle}
            className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer"
          >
         <FcGoogle />

            <span className="text-white font-medium">Sign in with Google</span>
          </button>

          {/* GitHub Login Button */}
          <button
            className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm cursor-pointer"
          >
           <FaGithub />

            <span className="text-white font-medium">Sign in with GitHub</span>
          </button>
        </div>

      
      </div>
    </div>
        </div>
    );
};

export default SocialLogin;