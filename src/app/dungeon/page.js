'use client';

import React, { useState, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';

export default function DungeonPage() {
  // Player state
  const [player, setPlayer] = useState({
    name: 'Player1',
    health: 500,
    dps: 80,
    counter: 0,
  });

  // Enemy state
  const [enemy, setEnemy] = useState({
    name: 'Unknown',
    health: 0,
    dps: 0,
  });
  const [fetchEnemy, setFetchEnemy] = useState([]);
  const [randomEnemy, setRandomEnemy] = useState(null);
  useEffect(() => {
    async function fetchEnemy() {
      const response = await fetch('http://localhost:3000/api/enemy');
      const data = await response.json();
      setFetchEnemy(data);

      if (data.length > 0) {
        const random = Math.floor(Math.random() * 20) + 1;
        const selectedEnemy = data[random];
        setRandomEnemy(selectedEnemy);

        setEnemy({
          name: selectedEnemy.enemy_name,
          health: selectedEnemy.enemy_health,
          dps: selectedEnemy.dps,
        });
      }
    }
    fetchEnemy();
  }, []);

  // Handle player attack
  const handleAttack = () => {
    if (enemy.health > 0) {
      setEnemy((prev) => ({ ...prev, health: prev.health - player.dps }));
    } else {
      // Reward and reset enemy health on defeat
      setPlayer((prev) => ({ ...prev, counter: prev.counter + 1 }));
      setEnemy({ ...enemy, health: 50 });
    }
  };

  // Enemy attack (reduces player health over time)

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      const enemyAttackInterval = setInterval(() => {
        setPlayer((prev) => ({
          ...prev,
          health: Math.max(0, prev.health - enemy.dps),
        }));
      }, 1000);

      return () => clearInterval(enemyAttackInterval);
    }, 2000);

    return () => clearTimeout(delayTimeout);
  }, [enemy.dps]);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
      <div className='flex justify-between w-full max-w-4xl p-4'>
        <div className='flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg'>
          <h2 className='text-2xl font-bold'>Player Info</h2>
          <p>Name: {player.name}</p>
          <p>Health: {player.health}</p>
          <p>DPS: {player.dps}</p>
          <p>Rewards Counter: {player.counter}</p>
          <button
            onClick={handleAttack}
            className='bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
          >
            Attack Enemy
          </button>
        </div>

        <div className='flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg'>
          <h2 className='text-2xl font-bold'>Enemy Info</h2>
          <p>Name: {enemy.name}</p>
          <p>Health: {enemy.health}</p>
          <p>DPS: {enemy.dps}</p>
        </div>
      </div>

      <Popover.Root>
        <Popover.Trigger className='bg-gray-700 px-4 py-2 rounded-lg mt-8'>
          View Details
        </Popover.Trigger>
        <Popover.Anchor />

        <Popover.Portal>
          <Popover.Content className='bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-xs'>
            <h3 className='font-bold text-lg'>Battle Details</h3>
            <p>
              You are facing {enemy.name}, a fearsome creature in the dungeon.
            </p>
            <p>Enemy Health: {enemy.health}</p>
            <p>Enemy DPS: {enemy.dps}</p>
            <p className='mt-2'>Player Health: {player.health}</p>
            <p>Player DPS: {player.dps}</p>
            <Popover.Close className='absolute top-1 right-1 text-gray-400'>
              Close
            </Popover.Close>
            <Popover.Arrow className='fill-gray-800' />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
