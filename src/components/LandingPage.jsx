'use client';
import Counter from './Counter';
import ShopItems from './ShopItems';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [count, setCount] = useState('Loading');
  const counter = () => setCount((prevCount) => prevCount + 1);
  const reset = async () => {
    const response = await fetch('http://localhost:3000/api/resetCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setCount(0);
    alert('Your game has been reset');
  };

  useEffect(() => {
    async function fetchUserCount() {
      const response = await fetch('http://localhost:3000/api/count');
      const data = await response.json();
      setCount(data.count);
    }

    fetchUserCount();
  }, []);

  return (
    <div className='bg-blue-800 rounded-lg p-6 shadow-lg transition duration-300 transform hover:scale-105'>
      <Counter count={count} counter={counter} reset={reset} />
      <ShopItems count={count} setCount={setCount} />
    </div>
  );
}
