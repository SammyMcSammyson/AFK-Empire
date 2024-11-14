'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShopItems({ count, setCount }) {
  let { userId } = useUser();
  const [shopItems, setShopItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [showShop, setShowShop] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Audio initialised for clicks and buy actions. "typeof Audio !== "undefined" this will prevent rendering errors on NextJS
  const [clickAudio] = useState(() =>
    typeof Audio !== 'undefined' ? new Audio('/audio/click.mp3') : null
  );
  const [buyAudio] = useState(() =>
    typeof Audio !== 'undefined' ? new Audio('/audio/buy.mp3') : null
  );

  useEffect(() => {
    async function fetchShopItems() {
      const response = await fetch('https://afk-empire.vercel.app/api/shop');
      const data = await response.json();
      setShopItems(data);
    }
    fetchShopItems();
  }, []);
  // added buy sound
  const buy = async (cost, item, itemId, health, dps) => {
    if (buyAudio) buyAudio.play();

    if (count >= cost) {
      const response = await fetch('https://afk-empire.vercel.app/api/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          cost,
          item,
          itemId,
          health,
          dps,
          currentCount: count,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(`You have just bought a ${item}`);
        setCount(result.newCount);
      } else {
        toast.error(
          result.message ||
            'Your slots are full you should sell some to make space'
        );
      }
    } else {
      toast.error(`You do not have enough money to purchase the ${item}`);
    }
  };

  // Play click sound on sell
  const sellItem = async (itemId, sellValue, item, health, dps) => {
    if (clickAudio) clickAudio.play();

    const response = await fetch('https://afk-empire.vercel.app/api/sell', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        itemId,
        sellValue,
        currentCount: count,
        health,
        dps,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success(`You have sold the ${item}`);
      setCount(result.newCount);
      console.log(count);
    } else {
      toast.error(`Your cannot sell something if you do not own it.`);
    }
  };

  const handleCategoryClick = (category) => {
    if (clickAudio) clickAudio.play();

    setSelectedCategory(category === selectedCategory ? '' : category);
  };
  // Play click sound added on shop toggle
  function toggle(itemId) {
    if (clickAudio) clickAudio.play();

    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }

  const toggleShop = () => {
    if (clickAudio) clickAudio.play();

    setShowShop((prev) => !prev);
  };

  const filteredItems = selectedCategory
    ? shopItems.filter((item) => item.category === selectedCategory)
    : shopItems;

  return (
    <div className='mt-8'>
      <h1
        onClick={toggleShop}
        className='text-2xl font-bold cursor-pointer text-purple-300 hover:text-yellow-400 transition duration-300'
      >
        Shop
      </h1>

      {showShop && (
        <div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              cursor: 'pointer',
            }}
          >
            <p onClick={() => handleCategoryClick('Potions')}>Potions</p>
            <p onClick={() => handleCategoryClick('Weapons')}>Weapons</p>
            <p onClick={() => handleCategoryClick('Armour')}>Armour</p>
            <p onClick={() => handleCategoryClick('Spell')}>Spells</p>
            <p onClick={() => handleCategoryClick('Artifacts')}>Artifacts</p>
          </div>

          <ul className='shopLists mt-4 space-y-4'>
            {filteredItems.map((item) => (
              <li
                key={item.id}
                className='bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300'
              >
                <div
                  onClick={() => toggle(item.id)}
                  className='flex justify-between items-center cursor-pointer'
                >
                  <p>{item.item}</p>
                </div>

                {expandedItems[item.id] && (
                  <div className='mt-2 space-y-2 text-gray-300'>
                    <p>Item: {item.item}</p>
                    <p>Cost: {item.cost}</p>
                    <p>Damage Per Second: {item.dps}</p>
                    <p>Health: {item.health}</p>
                    <p>Description: {item.description}</p>
                    <p>Category: {item.category}</p>
                    <p>Sell Value: {item.sell_value}</p>
                    <button
                      onClick={() =>
                        buy(
                          item.cost,
                          item.item,
                          item.id,
                          item.health,
                          item.dps
                        )
                      }
                      className='bg-gradient-to-r from-purple-500 to-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105 hover:shadow-lg shadow-purple-500/50 mr-4 '
                    >
                      Buy
                    </button>

                    <button
                      onClick={() =>
                        sellItem(
                          item.id,
                          item.sell_value,
                          item.item,
                          item.health,
                          item.dps
                        )
                      }
                      className='bg-gradient-to-r from-red-500 to-orange-500 text-white py-1 px-3 rounded hover:bg-orange-600 transition duration-300 transform hover:scale-105 hover:shadow-lg shadow-red-500/50 '
                    >
                      Sell
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
