'use client';

import React, { useState, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { en } from '@/enemy/enemy';
import { av } from '@/avatar/avatar';
import HealthProgressBar from '@/components/HealthProgressBar';
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function DungeonPage() {
  const [battleLog, setBattleLog] = useState([]);
  const [maxPlayerHealth, setMaxPlayerHealth] = useState('Loading');
  const [maxEnemyHealth, setMaxEnemyHealth] = useState('Loading');
  const [player, setPlayer] = useState({
    name: 'Player1',
    health: 'Loading',
    dps: 'Loading',
    counter: 0,
    cn: 0,
  });
  let user = useAuth();
  console.log(useAuth(user));

  useEffect(() => {
    async function fetchPlayer() {
      const response = await fetch('http://localhost:3000/api/player', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId }),
      });

      const data = await response.json();
      setPlayer({
        name: data.user_name,
        health: data.health,
        dps: data.dps,
        counter: data.counter,
        cn: data.characternumber - 1,
      });
      setMaxPlayerHealth(data.health);
    }

    fetchPlayer();
  }, []);

  const [enemy, setEnemy] = useState({
    name: 'Unknown',
    health: 0,
    dps: 0,
    cn: 0,
  });

  const [fetchEnemy, setFetchEnemy] = useState([]);
  const [randomEnemy, setRandomEnemy] = useState(null);

  useEffect(() => {
    async function fetchEnemy() {
      const response = await fetch('http://localhost:3000/api/enemy');
      const data = await response.json();
      setFetchEnemy(data);

      if (data.length > 0) {
        const random = Math.floor(Math.random() * data.length);
        const selectedEnemy = data[random];
        setRandomEnemy(selectedEnemy);
        const val = data[random].id - 1;

        setEnemy({
          name: selectedEnemy.enemy_name,
          health: selectedEnemy.enemy_health,
          dps: selectedEnemy.dps,
          cn: val,
        });
        setMaxEnemyHealth(selectedEnemy.enemy_health);
      }
    }
    fetchEnemy();
  }, []);

  // add audio state "typeof Audio !== "undefined" this will prevent rendering errors on NextJS
  const [punchAudio] = useState(() =>
    typeof Audio !== 'undefined' ? new Audio('/audio/punch.mp3') : null
  );
  const [clickAudio] = useState(() =>
    typeof Audio !== 'undefined' ? new Audio('/audio/click.mp3') : null
  );

  const handleAttack = () => {
    if (punchAudio) {
      punchAudio.currentTime = 0;
      punchAudio.play();
    }

    if (enemy.health > 0) {
      setEnemy((prev) => ({
        ...prev,
        health: Math.max(0, prev.health - player.dps),
      }));
      setBattleLog((prevLog) => [
        ...prevLog,
        `You have attacked ${enemy.name} for ${player.dps} damage.`,
      ]);
    } else {
      toast.success('You have won!');
      redirect('/');
    }
  };

  useEffect(() => {
    if (player.health <= 0) {
      toast.error('You have died!');
      redirect('/');
    }
  }, [player.health]);

  useEffect(() => {
    if (!enemy.name || enemy.dps === 0) return;
    const delayTimeout = setTimeout(() => {
      const enemyAttackInterval = setInterval(() => {
        setPlayer((prev) => ({
          ...prev,
          health: Math.max(0, prev.health - enemy.dps),
        }));

        setBattleLog((prevLog) => [
          ...prevLog,
          `${enemy.name} has attacked you for ${enemy.dps} damage.`,
        ]);
      }, 1000);

      return () => clearInterval(enemyAttackInterval);
    }, 1000);

    return () => clearTimeout(delayTimeout);
  }, [enemy.dps]);

  // add function to click sound to view details
  const handleViewDetailsClick = () => {
    if (clickAudio) {
      clickAudio.currentTime = 0;
      clickAudio.play();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-900 text-white'>
      <div className='flex justify-between w-full max-w-4xl p-4'>
        {/* this is player Info */}
        <div className='flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg'>
          <h2 className='text-2xl font-bold'>Player Info</h2>
          <p>Name: {player.name}</p>
          <p>Health:</p>
          <HealthProgressBar
            // progress bar defaults to 0 if health is NaN and 100 if maxhealth is NaN.
            health={isNaN(Number(player.health)) ? 0 : player.health}
            maxHealth={isNaN(Number(maxPlayerHealth)) ? 100 : maxPlayerHealth}
            color='bg-green-500'
          />
          <p>DPS: {player.dps}</p>
          <p>Rewards Counter: {player.counter}</p>
          <button
            onClick={handleAttack}
            className='bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
          >
            Attack Enemy
          </button>
        </div>

        <div className='flex'>
          <div className='m-5 mt-5'>
            <img id='frame' src={av[player.cn].url} alt='player' />
          </div>
          <div className='m-5 mt-5'>
            <img id='Eframe' src={en[enemy.cn].url} alt='enemy' />
          </div>
        </div>

        {/* This is for enemy Info */}
        <div className='flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg'>
          <h2 className='text-2xl font-bold'>Enemy Info</h2>
          <p>Name: {enemy.name}</p>
          <p>Health:</p>
          <HealthProgressBar
            health={isNaN(Number(enemy.health)) ? 0 : enemy.health}
            maxHealth={isNaN(Number(maxEnemyHealth)) ? 100 : maxEnemyHealth}
            color='bg-red-500'
          />
          <p>DPS: {enemy.dps}</p>
        </div>
      </div>

      {/* Radix Popover implemented here */}
      <Popover.Root>
        <Popover.Trigger
          onClick={handleViewDetailsClick}
          className='bg-gray-700 px-4 py-2 rounded-lg mt-8'
        >
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

            <div className='mt-4'>
              <h4 className='font-bold'>Battle Log:</h4>
              <div className='max-h-32 overflow-y-auto'>
                {battleLog.map((log, index) => (
                  <p key={index} className='text-sm'>
                    {log}
                  </p>
                ))}
              </div>
            </div>

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
