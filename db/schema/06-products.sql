-- Drop and recreate products table

DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  style_id INTEGER REFERENCES styles(id) ON DELETE CASCADE,
  color_id INTEGER REFERENCES colors(id) ON DELETE CASCADE,
  size_id INTEGER REFERENCES sizes(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  price INTEGER  NOT NULL DEFAULT 0
);

