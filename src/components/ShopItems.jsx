import { db } from '@/utils/dbConnection';

export default async function ShopItems() {
  let shopItems = [];
  const shop = await db.query(
    `SELECT id, cost, item, dps, health, description,sell_value, category FROM shop_table`
  );
  shopItems = shop.rows;

  console.log(shopItems, shop);
  return (
    <div>
      <p> Shop </p>
      <ul className='shopLists'>
        {shopItems.map((item) => (
          <li key={item.id}>
            <p>Item:{item.shopItem}</p>
            <p>Cost:{item.cost}</p>
            <p>Damage Per Second:{item.dps}</p>
            <p>Health:{item.health}</p>
            <p>Description:{item.description}</p>
            <p>Sell Value:{item.sell_value}</p>
            <p>Catergory:{item.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
