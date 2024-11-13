import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/utils/dbConnection';
import { av } from '@/avatar/avatar';

export default async function Profile() {
  const user = await currentUser();

  const userInfo = await db.query(
    `SELECT 
       ui.user_name, ui.characternumber, ui.user_bio, ui.health, ui.dps, ui.counter,
       st1.item AS item_1_name, st2.item AS item_2_name, st3.item AS item_3_name, 
       st4.item AS item_4_name, st5.item AS item_5_name
     FROM user_info ui
     LEFT JOIN shop_table st1 ON st1.id = ui.itemslot_1
     LEFT JOIN shop_table st2 ON st2.id = ui.itemslot_2
     LEFT JOIN shop_table st3 ON st3.id = ui.itemslot_3
     LEFT JOIN shop_table st4 ON st4.id = ui.itemslot_4
     LEFT JOIN shop_table st5 ON st5.id = ui.itemslot_5
     WHERE ui.user_id = $1`,
    [user.id]
  );

  const uiw = userInfo.rows;

  return (
    <>
      <h1>Profile</h1>
      {uiw.map((item) => {
        return (
          <div key={item.id}>
            <p>Username: {item.user_name}</p>
            <p>Avatar: {item.characternumber}</p>
            <img
              src={av[item.characternumber - 1].url}
              alt='avatar'
              width={150}
            />
            <p>Bio: {item.user_bio}</p>
            <p>Health: {item.health}</p>
            <p>Damage: {item.dps}</p>
            <p>Counter: {item.counter}</p>
            <div>
              <p>Your Gear:</p>
              <p>{item.item_1_name || 'Empty'}</p>
              <p>{item.item_2_name || 'Empty'}</p>
              <p>{item.item_3_name || 'Empty'}</p>
              <p>{item.item_4_name || 'Empty'}</p>
              <p>{item.item_5_name || 'Empty'}</p>
            </div>
          </div>
        );
      })}
      <Link href={'/create-profile'}>Edit profile</Link>
    </>
  );
}
