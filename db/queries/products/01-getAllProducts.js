const getAllProducts = (db) => {
  return db.query(`
    SELECT * FROM products
    ;`)
}

module.exports = { getAllProducts };
