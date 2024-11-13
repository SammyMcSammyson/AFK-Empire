import { db } from '@/utils/dbConnection';
import { currentUser } from '@clerk/nextjs/server';

export async function POST(req) {
  const user1 = await currentUser();
  const user2 = user1.username;

  const updateResult = await db.query(
    `UPDATE user_info
       SET counter = 0, itemslot_1 = NULL
       WHERE user_name = $1
       RETURNING counter`,
    [user2]
  );
  return new Response(
    JSON.stringify({ newCount: updateResult.rows[0].counter })
  );
}
