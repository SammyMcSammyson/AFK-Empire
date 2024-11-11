import { db } from '@/utils/dbConnection';

export async function GET(request) {
  
    const shop = await db.query(
      `SELECT id, cost, item, dps, health, description, sell_value, category FROM shop_table`
    );

    return new Response(JSON.stringify(shop.rows))

}
