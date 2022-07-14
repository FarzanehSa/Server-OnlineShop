const setQtyInventory = (db, barcode, qty) => {

  return db.query(`
  INSERT INTO inventory
    (barcode, quantity)
    VALUES ($1, $2)
    RETURNING *;`, [barcode, qty])
}
module.exports = { setQtyInventory };
