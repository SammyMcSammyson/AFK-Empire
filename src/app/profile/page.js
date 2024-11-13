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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">Profile</h1>

      {uiw.map((item) => (
        <div key={item.user_name} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md hover:shadow-yellow-400/50 transition duration-300 transform hover:scale-95">
          <p className="text-lg font-semibold text-yellow-400 mb-2">Username: <span className="text-white">{item.user_name}</span></p>
          <p className="text-lg font-semibold text-yellow-400 mb-2">Avatar:</p>

          <div className="flex justify-center mb-4">
            <img
              src={av[item.characternumber - 1].url}
              alt="avatar"
              width={150}
              className="hover:shadow-lg transition-shadow duration-300"
            />
          </div>

          <p className="text-lg font-semibold text-yellow-400 mb-2">Bio:</p>
          <p className="text-white mb-4">{item.user_bio}</p>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-yellow-400">Health: <span className="text-white">{item.health}</span></p>
            <p className="text-lg font-semibold text-yellow-400">Damage: <span className="text-white">{item.dps}</span></p>
            <p className="text-lg font-semibold text-yellow-400">Counter: <span className="text-white">{item.counter}</span></p>
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold text-yellow-400 mb-2">Your Gear:</p>
            <div className="table w-full border-separate border-spacing-y-2">
              {[item.item_1_name, item.item_2_name, item.item_3_name, item.item_4_name, item.item_5_name].map((gear, index) => (
                <div
                // this should provide a unique key for each item slot
                  key={`${item.user_name}-gear-${index}`}  
                  className="table-row bg-gray-700 hover:bg-gray-600 transition duration-300 rounded-lg"
                >
                  <div className="table-cell py-2 px-4 text-white text-center border border-yellow-400">{gear}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Link
        href="/create-profile"
        className="mt-8 px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-lg transition-all duration-300"
      >
        Edit Profile
      </Link>
    </div>
  );
}
