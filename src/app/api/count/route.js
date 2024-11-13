import { db } from '@/utils/dbConnection';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req) {
  const user1 = await currentUser();
  const user2 = user1.username;

  const result = await db.query(
    `SELECT counter FROM user_info WHERE user_name = $1`,
    [user2]
  );

  const { counter } = result.rows[0];

  return new Response(JSON.stringify({ count: counter }));
}
