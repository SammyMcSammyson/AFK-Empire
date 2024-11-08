'use client';
import { useState } from 'react';
import Counter from './Counter';
import Shop from './Shop';

const LandingPage = () => {
  const [count, setCount] = useState(0);
  const counter = () => setCount(count + 1);
  const reset = () => setCount(0);

  return (
    <div>
      <Counter count={count} counter={counter} reset={reset} />
      <Shop count={count} setCount={setCount} />
    </div>
  );
};

export default LandingPage;
