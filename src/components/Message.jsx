'use client'
import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const Message = () => {
    const [isPopup,setPopup]=useState(false)
    return (
 <div>

   {
    isPopup&&  <div className="fixed top-[550px] right-7">
  <div className="flex items-start gap-3 bg-white shadow-lg border border-gray-200 rounded-2xl p-4 w-80">
    {/* Bot Icon */}
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold">
      🤖
    </div>

    {/* Message Content */}
    <div>
      <p className="text-gray-700 text-sm leading-relaxed">
        Hello there! 👋 <br /> AI Feature Coming soon
      </p>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Type your Question..."
        className="input input-bordered border border-black w-full mt-3 text-black bg-white text-sm  focus:ring-2 focus:ring-blue-400"
      />

      <button  className='btn btn-primary mt-4'>Chat</button>
    </div>
  </div>
</div>


  }
        <div className="fixed top-[750px] right-11">



  <button onClick={()=>setPopup(!isPopup)}
    className="btn btn-primary text-white hover:bg-slate-800 active:scale-95 transition-all duration-200 
               p-5 rounded-xl shadow-md border border-slate-700 flex items-center justify-center "
  >
    <FaRobot fontSize={30} className="text-xl" />
  </button>

 
</div>
 </div>

    );
};

export default Message;