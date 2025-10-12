import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen  text-white">
      <FaSpinner className="animate-spin text-indigo-500 text-5xl mb-4" />
      <h2 className="text-xl font-semibold tracking-wide">Loading...</h2>
      <p className="text-gray-400 text-sm mt-2">
        Please wait while we fetch the latest content.
      </p>
    </div>
  );
};

export default Loading;
