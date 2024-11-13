"use client";

import React, { useState, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { en } from "@/enemy/enemy";

import HealthProgressBar from "@/components/HealthProgressBar";

export default function DungeonPage() {
  const maxPlayerHealth = 100;
  const maxEnemyHealth = 100;

  const [player, setPlayer] = useState({
    name: "Player1",
    health: maxPlayerHealth,
    dps: 10,

    counter: 0,
  });

  const [enemy, setEnemy] = useState({
    name: "Unknown",
    health: 0,
    dps: 0,
    cn: 0,
  });

  const [fetchEnemy, setFetchEnemy] = useState([]);
  const [randomEnemy, setRandomEnemy] = useState(null);

  useEffect(() => {
    async function fetchEnemy() {
      const response = await fetch("http://localhost:3000/api/enemy");
      const data = await response.json();
      setFetchEnemy(data);

      if (data.length > 0) {
        // const random = Math.floor(Math.random() * 20) + 1;
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
        console.log(val);
      }
    }
    fetchEnemy();
  }, []);

  const handleAttack = () => {
    if (enemy.health > 0) {
      setEnemy((prev) => ({
        ...prev,
        health: Math.max(0, prev.health - player.dps),
      }));
    } else {
      setPlayer((prev) => ({ ...prev, counter: prev.counter + 1 }));
      setEnemy({ ...enemy, health: maxEnemyHealth });
    }
  };

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="flex justify-between w-full max-w-4xl p-4">
        {/* this is part is for player Info */}
        <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold">Player Info</h2>
          <p>Name: {player.name}</p>
          <p>Health:</p>
          <HealthProgressBar
            health={player.health}
            maxHealth={maxPlayerHealth}
            color="bg-green-500"
          />
          <p>DPS: {player.dps}</p>
          <p>Rewards Counter: {player.counter}</p>
          <button
            onClick={handleAttack}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Attack Enemy
          </button>
        </div>
        <div className="flex">
          <div
            id="frame"
            className={`bg-[url(/images/avatar/av2.png)] mr-10 mt-20`}
          ></div>
          <div className="ml-10 mt-20">
            <img id="Eframe" src={en[enemy.cn].url} alt="enemy" />
          </div>
        </div>

        {/* This part is for enemy info */}
        <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold">Enemy Info</h2>
          <p>Name: {enemy.name}</p>
          <p>Health:</p>
          <HealthProgressBar
            health={enemy.health}
            maxHealth={maxEnemyHealth}
            color="bg-red-500"
          />
          <p>DPS: {enemy.dps}</p>
        </div>
      </div>

      {/* popover radix UI primitive implemented here */}
      <Popover.Root>
        <Popover.Trigger className="bg-gray-700 px-4 py-2 rounded-lg mt-8">
          View Details
        </Popover.Trigger>
        <Popover.Anchor />

        <Popover.Portal>
          <Popover.Content className="bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-bold text-lg">Battle Details</h3>
            <p>
              You are facing {enemy.name}, a fearsome creature in the dungeon.
            </p>
            <p>Enemy Health: {enemy.health}</p>
            <p>Enemy DPS: {enemy.dps}</p>
            <p className="mt-2">Player Health: {player.health}</p>
            <p>Player DPS: {player.dps}</p>
            <Popover.Close className="absolute top-1 right-1 text-gray-400">
              Close
            </Popover.Close>
            <Popover.Arrow className="fill-gray-800" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
