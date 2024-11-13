"use client";

import React from 'react';
import * as Progress from '@radix-ui/react-progress';

export default function HealthProgressBar({ health, maxHealth, color = 'bg-green-500' }) {
  // the percentage is caluclated , capped between 0 and 100
  const healthPercent = Math.min(100, Math.max(0, (health / maxHealth) * 100));

  return (
    <div className="w-full">
      <Progress.Root
        className="relative h-4 w-full overflow-hidden rounded-full bg-gray-700"
        style={{ transform: "translateZ(0)" }} 
        value={healthPercent} 
      >
        <Progress.Indicator
          className={`h-full ${color} transition-transform duration-[660ms]`}
          style={{
            width: `${healthPercent}%`, 
            transform: `translateX(-${100 - healthPercent}%)`,
          }}
        />
      </Progress.Root>
      <p className="text-sm text-gray-400 mt-2">
        {health} / {maxHealth}
      </p>
    </div>
  );
}


