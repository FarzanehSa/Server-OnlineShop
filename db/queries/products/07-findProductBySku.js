const findProductBySku = (db, sku) => {
  return db.query(`
    SELECT *
    FROM products
    WHERE sku = $1;`, [sku]
  )
}

module.exports = { findProductBySku };
