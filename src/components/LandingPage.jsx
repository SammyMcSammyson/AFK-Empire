'use client';
import Counter from './Counter';
import ShopItems from './ShopItems';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function LandingPage() {
  const [count, setCount] = useState('Loading');
  const counter = () => setCount((prevCount) => prevCount + 1);
  const reset = async () => {
    const response = await fetch(
      'https://afk-empire.vercel.app/api/resetCount',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    setCount(0);
    alert('Your game has been reset');
  };

  useEffect(() => {
    async function fetchUserCount() {
      const response = await fetch('https://afk-empire.vercel.app/api/count');
      const data = await response.json();
      setCount(data.count);
    }

    fetchUserCount();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('victory') === 'true') {
      toast.success('You have won!');
      localStorage.removeItem('victory');
    }
  }, []);

  return (
    <div className='bg-blue-800 rounded-lg p-6 shadow-lg transition duration-300 transform hover:scale-105'>
      <Counter count={count} counter={counter} reset={reset} />
      <ShopItems count={count} setCount={setCount} />
    </div>
  );
}
