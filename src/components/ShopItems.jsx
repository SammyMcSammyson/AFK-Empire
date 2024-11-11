'use client';
import { useEffect, useState } from 'react';

export default function Shop({ count, setCount }) {
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
    <div>
      <h1 onClick={toggleShop} style={{ cursor: 'pointer' }}>
        Shop
      </h1>
      {showShop && (
        <ul className='shopLists'>
          {shopItems.map((item) => (
            <li key={item.id}>
              <div
                onClick={() => toggle(item.id)}
                style={{ cursor: 'pointer' }}
              >
                <p>{item.item}</p>
              </div>

              {expandedItems[item.id] && (
                <>
                  <p>Cost: {item.cost}</p>
                  <p>Damage Per Second: {item.dps}</p>
                  <p>Health: {item.health}</p>
                  <p>Description: {item.description}</p>
                  <p>Sell Value: {item.sell_value}</p>
                  <p>Category: {item.category}</p>
                  <button onClick={() => buy(item.cost, item.item)}>Buy</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
