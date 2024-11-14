'use client';

import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';

export default function BurgerMenu() {
  //By default the menu is closed
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavigationMenu.Root className='relative z-20'>
      <button
        onClick={() => setIsOpen(!isOpen)}

        className=" burger-menu-button flex flex-col gap-1.5 p-2 border-none bg-transparent cursor-pointer"
      >
        {/* This bit is the burger icon */}
        <span className='w-6 h-0.5 bg-gray-800'></span>
        <span className='w-6 h-0.5 bg-gray-800'></span>
        <span className='w-6 h-0.5 bg-gray-800'></span>
      </button>

      {isOpen && (
        <NavigationMenu.List className='absolute left-0 w-40 bg-white rounded-lg shadow-lg flex flex-col p-4 space-y-2'>
          <NavigationMenu.Item>
            <Link
              href='/'
              className='text-gray-800 font-semibold hover:bg-gray-100 px-3 py-2 rounded'
            >
              Home
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Link
              href='/profile'
              className='text-gray-800 font-semibold hover:bg-gray-100 px-3 py-2 rounded'
            >
              Profile
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Link
              href='/shop'
              className='text-gray-800 font-semibold hover:bg-gray-100 px-3 py-2 rounded'
            >
              Shop
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Link
              href='/dungeon'
              className='text-gray-800 font-semibold hover:bg-gray-100 px-3 py-2 rounded'
            >
              Dungeon
            </Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      )}
      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}
