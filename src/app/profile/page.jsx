"use client";

import Loading from "@/components/Loading";
import { AuthContext } from "@/Provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();

 const {user, logOut,loading}=useContext(AuthContext)

  const handleLogout = () => {
    logOut().then(()=>{

        router.push("/login");
    })
  };


  if (loading) {
    return <Loading></Loading>
  }
  useEffect(()=>{
    if (!user) {
       router.push("/login"); 
    }
  },[user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body text-center">
          
          {/* Avatar */}
          <div className="avatar justify-center">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="user" />
            </div>
          </div>

          {/* User Info */}
          <h2 className="text-2xl font-bold mt-4">{user?.displayName}</h2>
          <p className="text-gray-500">{user?.email}</p>

          {/* Logout Button */}
          <div className="card-actions justify-center mt-6">
            <button
              onClick={handleLogout}
              className="btn btn-error btn-outline w-full hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
