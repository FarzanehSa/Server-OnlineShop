const getAvailableSizes = (db) => {
  return db.query(`
    SELECT products.id as id, sizes.size as size, barcode, qty
    FROM inventory_barcodes
    JOIN products ON product_id = products.id
    JOIN sizes ON size_id = sizes.id
    ORDER BY products.id
    ;`)
}

module.exports = { getAvailableSizes };
