import { db } from '@/utils/dbConnection';

export async function GET(request) {
  const enemy = await db.query(
    `SELECT id, enemy_name, enemy_health, dps, characternumber category FROM enemy_info`
  );

  return new Response(JSON.stringify(enemy.rows));
}
