'use client'
import { AuthContext } from '@/Provider/AuthProvider';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const NavBar = () => {
    const { user,logOut } = useContext(AuthContext)
    return (
        <div className=''>
            <div className="navbar bg-white/10 rounded-full px-5 py-3 backdrop-blur-md shadow-sm mx-auto lg:w-[50%] w-[95%] z-30 ">
                <div className="navbar-start">
                    <Link href={'/'} className="btn btn-ghost text-xl">Code Blog</Link>
                </div>
                <div className="navbar-center hidden lg:flex">

                </div>
                <div className="navbar-end">
                    {user?.email ?  <button onClick={logOut} className="btn rounded-full btn-error text-white"><FaArrowLeft></FaArrowLeft> Logout</button>: <Link href={'/login'} className="btn rounded-full">Login</Link>}

                </div>
            </div>
        </div>
    );
};

export default NavBar;