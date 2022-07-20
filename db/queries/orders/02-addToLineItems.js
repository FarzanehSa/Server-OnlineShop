const addToLineItems = (db, orderInfo, id) => {
  return db.query(`
  INSERT INTO line_items
  (order_id, product_size_id, product_id, qty, price)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *;`, [id, orderInfo.barcode, orderInfo.id, orderInfo.qty, orderInfo.price ])
}
module.exports = { addToLineItems };
