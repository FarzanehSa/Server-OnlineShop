-- Drop and recreate products table

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  sku INTEGER NOT NULL UNIQUE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  style_id INTEGER REFERENCES styles(id) ON DELETE CASCADE,
  color_id INTEGER REFERENCES colors(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_1 VARCHAR(512),
  image_2 VARCHAR(512),
  image_3 VARCHAR(512),
  price INTEGER  NOT NULL DEFAULT 0,
  display_feature BOOLEAN  NOT NULL DEFAULT false
);

