'use client'
import axios from 'axios';
import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';

const Message = () => {
  const [isPopup, setPopup] = useState(false);
  const [chat, setChat] = useState([]); // single array for all messages
  const [loading, setLoading] = useState(false);

  const handleEvent = async (e) => {
    e.preventDefault();
    const message = e.target.message.value.trim();
    if (!message) return;

  
    setChat((prev) => [...prev, { sender: "user", text: message }]);
    e.target.reset();

    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_URI_API}/generate-blog`, {
        userPrompt: message,
      });

      const response = res.data;
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: response.blogContent || "No reply received." },
      ]);
    } catch (error) {
      console.error(error.message);
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, something went wrong!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div>
  {isPopup && (
    <div className="fixed bottom-24 right-5 md:bottom-32 md:right-7 z-50">
      <div className="flex flex-col gap-3 bg-white shadow-2xl border border-gray-200 rounded-2xl p-4 
                      w-[90vw] max-w-[340px] h-[420px] sm:h-[400px] md:h-[380px]">

        {/* Chat Messages */}
        <div className="flex flex-col gap-3 overflow-y-auto pr-2 flex-grow">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "justify-end" : ""
              }`}
            >
              {/* Bot */}
              {msg.sender === "bot" && (
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg font-bold">
                  🤖
                </div>
              )}

              {/* Message */}
              <div
                className={`text-sm rounded-xl p-3 max-w-[220px] break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.text}
              </div>

              {/* User */}
              {msg.sender === "user" && (
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold">
                  👤
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center justify-center mt-2">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          )}
        </div>

        {/* Input Field */}
        <form onSubmit={handleEvent} className="mt-auto">
          <input
            type="text"
            name="message"
            placeholder="Type your Question..."
            className="input input-bordered border border-black w-full text-black bg-white text-sm focus:ring-2 focus:ring-blue-400"
          />
          <button className="btn btn-primary mt-3 w-full text-white">
            Chat
          </button>
        </form>
      </div>
    </div>
  )}

  {/* Floating Chat Button */}
  <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50">
    <button
      onClick={() => setPopup(!isPopup)}
      className="btn btn-primary text-white hover:bg-slate-800 active:scale-95 transition-all duration-200 
             p-5 rounded-xl shadow-md border border-slate-700 flex items-center justify-center"
    >
      <FaRobot fontSize={30} className="text-xl" />
    </button>
  </div>
</div>

  );
};

export default Message;
