const findBarcodeInProductSizeTable = (db, barcode) => {
  return db.query(`
  SELECT *
  FROM product_sizes
  WHERE id = $1
  `, [barcode])
}

module.exports = { findBarcodeInProductSizeTable };
