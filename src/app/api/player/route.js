import { db } from '@/utils/dbConnection';

export async function POST(req) {
  const { userId } = await req.json();
  const result = await db.query(
    'SELECT user_name, health, dps, counter FROM user_info WHERE user_id = $1',
    [userId]
  );
  return new Response(JSON.stringify(result.rows[0]), { status: 200 });
}
