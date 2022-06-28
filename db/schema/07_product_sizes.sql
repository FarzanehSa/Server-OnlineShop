-- Drop and recreate products table

DROP TABLE IF EXISTS inventory_barcodes CASCADE;

CREATE TABLE inventory_barcodes (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  size_id INTEGER REFERENCES sizes(id) ON DELETE CASCADE,

  barcode INTEGER NOT NULL UNIQUE,
  qty INTEGER  NOT NULL DEFAULT 4
);

