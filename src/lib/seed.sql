CREATE TABLE IF NOT EXISTS user_info (
 id SERIAL PRIMARY KEY,
 user_id TEXT UNIQUE,
 user_name TEXT UNIQUE,
 characternumber INTEGER,
 user_bio TEXT,
 itemslot_1 INTEGER,
 itemslot_2 INTEGER,
 itemslot_3 INTEGER,
 itemslot_4 INTEGER,
 itemslot_5 INTEGER,
 counter INTEGER,
 health INTEGER,
 dps INTEGER,
 join_date DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE IF NOT EXISTS shop_table (
  id SERIAL PRIMARY KEY,
  USER_id TEXT UNIQUE REFERENCES user_info (user_id) ON DELETE CASCADE,
  item TEXT,
  dps INTEGER,
  health INTEGER,
  description TEXT,
  sell_value INTEGER
);

CREATE TABLE IF NOT EXISTS enemy_info (
  id SERIAL PRIMARY KEY,
  enemy_name TEXT,
  enemy_health INTEGER,
  dps INTEGER,
  characternumber INTEGER
);

CREATE TABLE IF NOT EXISTS user_posts(
 id SERIAL PRIMARY KEY,
 post_content TEXT,
 user_id TEXT REFERENCES user_info (user_id) ON DELETE CASCADE,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_comments(
 id SERIAL PRIMARY KEY,
 comment_content TEXT,
 user_id TEXT REFERENCES user_info(user_id),
 post_id INTEGER REFERENCES user_posts (id) ON DELETE CASCADE,
 created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);