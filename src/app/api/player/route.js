import { db } from '@/utils/dbConnection';

export async function handler(req, res) {
  const { userId } = req.query;

  const result = await db.query(
    'SELECT user_name, health, dps, counter FROM user_info WHERE user_id = $1',
    [userId]
  );

  return res.status(200).json(result.rows[0]);
}

export default handler;
