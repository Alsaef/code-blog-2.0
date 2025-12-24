'use client'
import { AuthContext } from '@/Provider/AuthProvider';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { FaArrowLeft, FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = (
    <>
      <li>
        <Link
          href="/code-spot"
          className="hover:text-indigo-500 transition-colors font-medium"
          onClick={() => setMenuOpen(false)}
        >
          Code Spot
        </Link>
      </li>
      {/* Add more links here if needed */}
    </>
  );

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
      <div className="w-[95%] lg:w-[50%] backdrop-blur-xl bg-white/20 shadow-xl rounded-3xl border border-white/30 transition-all duration-300">
        <div className="navbar px-6 py-3">
          {/* Left */}
          <div className="navbar-start">
            <Link
              href="/"
              className="btn btn-ghost text-2xl font-extrabold text-indigo-600 hover:text-indigo-400 transition-colors"
            >
              Code Blog AI
            </Link>
          </div>

          {/* Center (Desktop) */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-6">{menuItems}</ul>
          </div>

          {/* Right */}
          <div className="navbar-end flex items-center gap-3">
            {/* Mobile Hamburger */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn btn-ghost p-2 text-gray-700 hover:text-indigo-500 transition-colors"
              >
                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
              {menuOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white/30 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg flex flex-col gap-3 p-4 animate-fade-in">
                  {menuItems}
                </ul>
              )}
            </div>

            {/* Auth Buttons */}
            {user?.email ? (
              <Link href={'/profile'}>
              <div className="avatar">
                <div className=" lg:w-[50px] md:w-[50] sm:w-[40px] w-[30px] rounded-full ">
                  <img src={user?.photoURL} />
                </div>
              </div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="btn rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
