'use client';

const Counter = ({ count, counter, reset }) => {
  return (
    <div>
      <h1>Money: {count}</h1>
      <button onClick={counter}> Click </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Counter;
