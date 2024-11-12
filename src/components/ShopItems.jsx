'use client';
import { useEffect, useState } from 'react';

export default function ShopItems({ count, setCount }) {
  const [shopItems, setShopItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [showShop, setShowShop] = useState(false);

  useEffect(() => {
    async function fetchShopItems() {
      const response = await fetch('http://localhost:3000/api/shop');
      const data = await response.json();
      setShopItems(data);
    }
    fetchShopItems();
  }, []);

  function buy(cost, item) {
    if (count >= cost) {
      setCount(count - cost);
      alert(`You bought the ${item}`);
    } else {
      alert(`You do not have enough money to purchase the ${item}`);
    }
  }

  function toggle(itemId) {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  }

  const toggleShop = () => {
    setShowShop((prev) => !prev);
  };

  return (
    <div className="mt-8">
      <h1 onClick={toggleShop} className="text-2xl font-bold cursor-pointer text-orange-500 hover:text-orange-400 transition duration-300">
        Shop
      </h1>
      {showShop && (
        <ul className="shopLists mt-4 space-y-4">
          {shopItems.map((item) => (
            <li key={item.id} className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div
                onClick={() => toggle(item.id)}
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-lg font-semibold text-white">{item.item}</p>
              </div>

              {expandedItems[item.id] && (
                <div className="mt-2 space-y-2 text-gray-300">
                  <p>Cost: {item.cost}</p>
                  <p>Damage Per Second: {item.dps}</p>
                  <p>Health: {item.health}</p>
                  <p>Description: {item.description}</p>
                  <p>Sell Value: {item.sell_value}</p>
                  <p>Category: {item.category}</p>
                  <button
                    onClick={() => buy(item.cost, item.item)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-300 transform hover:scale-105 hover:shadow-lg shadow-purple-500/50"
                  >
                    Buy
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
