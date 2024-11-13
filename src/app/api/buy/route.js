import { db } from '@/utils/dbConnection';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req) {
  const requestBody = await req.json();
  const {
    cost,
    health: itemHealth,
    dps: itemDps,
    itemId,
    currentCount,
  } = requestBody;

  const user1 = await currentUser();
  const user2 = user1.username;

  const newCounter = currentCount - cost;

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

  const newHealth = currentHealth + (itemHealth || 0);
  const newDps = currentDps + (itemDps || 0);

  let assignedSlot = null;
  if (!itemslot_1) assignedSlot = 'itemslot_1';
  else if (!itemslot_2) assignedSlot = 'itemslot_2';
  else if (!itemslot_3) assignedSlot = 'itemslot_3';
  else if (!itemslot_4) assignedSlot = 'itemslot_4';
  else if (!itemslot_5) assignedSlot = 'itemslot_5';

  if (!assignedSlot) {
    await db.query('ROLLBACK');
    return new Response(
      JSON.stringify({ message: 'No free item slots available' }),
      { status: 400 }
    );
  }

  const updateResult = await db.query(
    `UPDATE user_info
       SET counter = $1, health = $2, dps = $3, ${assignedSlot} = $4
       WHERE user_name = $5
       RETURNING counter`,
    [newCounter, newHealth, newDps, itemId, user2]
  );

  await db.query('COMMIT');

  return new Response(
    JSON.stringify({
      message: 'You have brought an item',
      newCount: updateResult.rows[0].counter,
      assignedSlot,
    })
  );
}
