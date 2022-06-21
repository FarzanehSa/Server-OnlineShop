const getAllProducts = (db) => {
  return db.query(`
    SELECT products.id as id, categories.cat as category, styles.style as style,
      colors.color as color, sizes.size as size, products.name as name,
      products.description as description, products.image_url as image_url, products.price as price
    FROM products
    JOIN categories On category_id = categories.id
    JOIN styles On style_id = styles.id
    JOIN sizes On size_id = sizes.id
    JOIN colors On color_id = colors.id
    ORDER BY products.id
    ;`)
}

module.exports = { getAllProducts };

// id, category_id, style_id, color_id, size_id, name, description, image_url, price
