-- Drop and recreate products table

DROP TABLE IF EXISTS inventory_barcodes CASCADE;

CREATE TABLE inventory_barcodes (
  id VARCHAR(16) PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  size_id INTEGER REFERENCES sizes(id) ON DELETE CASCADE
);

