'use client';

const Counter = ({ count, counter, reset }) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white-500">Money: {count}</h1>
      
      <button 
        onClick={counter}
        className="py-2 px-6 rounded-lg font-semibold text-black bg-gradient-to-r from-yellow-500 to-blue-700 shadow-md hover:shadow-lg hover:shadow-teal-500/60 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500"
      > Click
      </button>
      
      <button 
        onClick={reset}
        className="py-2 px-6 rounded-lg font-semibold text-black bg-gradient-to-r from-red-500 to-orange-500 shadow-md hover:shadow-lg hover:shadow-red-500/60 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
      > Reset
      </button>
    </div>
  );
};

export default Counter;
