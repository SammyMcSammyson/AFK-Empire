import { db } from '@/utils/dbConnection';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req) {
  const requestBody = await req.json();
  const {
    sell_value
    cost,
    health: itemHealth,
    dps: itemDps,
    itemId,
    currentCount,
  } = requestBody;

  const user1 = await currentUser();
  const user2 = user1.username;

  const newCounter = currentCount + sell_value;

  const userResult = await db.query(
    `SELECT counter, health, dps, itemslot_1, itemslot_2, itemslot_3, itemslot_4, itemslot_5 
       FROM user_info 
       WHERE user_name = $1 
       FOR UPDATE`,
    [user2]
  );

  const user = userResult.rows[0];
  const {
    health: currentHealth,
    dps: currentDps,
    itemslot_1,
    itemslot_2,
    itemslot_3,
    itemslot_4,
    itemslot_5,
  } = user;

  const newHealth = currentHealth - (itemHealth || 0);
  const newDps = currentDps - (itemDps || 0);

  let slotToClear = null;

  if (itemslot_1 === itemId) slotToClear = 'itemslot_1';
  else if (itemslot_2 === itemId) slotToClear = 'itemslot_2';
  else if (itemslot_3 === itemId) slotToClear = 'itemslot_3';
  else if (itemslot_4 === itemId) slotToClear = 'itemslot_4';
  else if (itemslot_5 === itemId) slotToClear = 'itemslot_5';


  const updateResult = await db.query(
    `UPDATE user_info
       SET counter = $1, health = $2, dps = $3, ${slotToClear} = NULL
       WHERE user_name = $4
       RETURNING counter`,
    [newCounter, newHealth, newDps, user2]
  );

  await db.query('COMMIT');

  return new Response(
    JSON.stringify({
      message: 'Item removed and sold successfully',
      newCount: updateResult.rows[0].counter,
      removedSlot: slotToClear,
    })
  );
}
