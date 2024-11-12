'use client';
import { useState } from 'react';
import Counter from './Counter';
import ShopItems from './ShopItems';

const LandingPage = () => {
  const [count, setCount] = useState(1000);
  const counter = () => setCount(count + 1);
  const reset = () => setCount(0);

  return (
    <div className="bg-blue-800 rounded-lg p-6 shadow-lg transition duration-300 transform hover:scale-105">
      <Counter count={count} counter={counter} reset={reset} />
      <ShopItems count={count} setCount={setCount} />
    </div>
  );
};

export default LandingPage;
