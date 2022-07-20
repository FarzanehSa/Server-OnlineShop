const addToOrders = (db, subtotal) => {
  return db.query(`
  INSERT INTO orders
  (subtotal)
   VALUES ($1)
   RETURNING *;`, [subtotal])
}
module.exports = { addToOrders };
