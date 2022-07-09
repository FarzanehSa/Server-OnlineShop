const getProductBySku = (db, sku) => {
  return db.query(`
  SELECT products.sku as sku, categories.cat as category, styles.style as style,
  colors.color as color, products.name as name,
  products.description as description, products.image1 as image1,
  products.image2 as image2, products.image3 as image3,
  products.price as price, products.disp as disp
  FROM products
  JOIN categories On category_id = categories.id
  JOIN styles On style_id = styles.id
  JOIN colors On color_id = colors.id
  WHERE products.sku = $1
  ORDER BY products.id;`, [sku])
}

module.exports = { getProductBySku };
