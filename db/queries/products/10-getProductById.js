const getProductById = (db, id) => {
  return db.query(`
  SELECT products.id as id, products.sku as sku, categories.cat as category, styles.style as style,
  colors.color as color, products.name as name,
  products.description as description, products.image_1 as image1,
  products.image_2 as image2, products.image_3 as image3,
  products.price as price, products.display_feature as disp
  FROM products
  JOIN categories On category_id = categories.id
  JOIN styles On style_id = styles.id
  JOIN colors On color_id = colors.id
  WHERE products.id = $1;`, [id])
}

module.exports = { getProductById };
