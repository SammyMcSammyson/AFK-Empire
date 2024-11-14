"use client";

import { useState } from "react";

const Counter = ({ count, counter, reset }) => {
  const [clickSound] = useState(() =>
    typeof Audio !== 'undefined' ? new Audio('/audio/click.mp3') : null
  );
  const [resetSound] = useState(() =>
    typeof Audio !== 'undefined' ? new Audio('/audio/reset.mp3') : null
  );

  // handle the click sound
  const handleCounterClick = () => {
    clickSound.currentTime = 0; 
    clickSound.play();
    counter(); 
  };

  // handle reset button
  const handleResetClick = () => {
    resetSound.currentTime = 0; 
    resetSound.play();
    reset(); 
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white-500">Money: {count}</h1>

      <button
        onClick={handleCounterClick}
        className="py-2 px-6 rounded-lg font-semibold text-black bg-gradient-to-r from-yellow-500 to-blue-700 shadow-md hover:shadow-lg hover:shadow-teal-500/60 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        Click
      </button>

      <button
        onClick={handleResetClick}
        className="py-2 px-6 rounded-lg font-semibold text-black bg-gradient-to-r from-red-500 to-orange-500 shadow-md hover:shadow-lg hover:shadow-red-500/60 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Reset
      </button>
    </div>
  );
};

export default Counter;