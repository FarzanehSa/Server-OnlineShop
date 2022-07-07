/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const {getAllProducts} = require('../db/queries/products/01-getAllProducts');
const {getCategories} = require('../db/queries/products/02-getCategories');
const {getStyles} = require('../db/queries/products/03-getStyles');
const {getColors} = require('../db/queries/products/04-getColors');
const {getSizes} = require('../db/queries/products/05-getSizes');
const {getProductBySku} = require('../db/queries/products/07-getProductBySku');
const {addNewProduct} = require('../db/queries/products/08-addNewProduct');
const {updateById} = require('../db/queries/products/09-updateById');
const {getProductById} = require('../db/queries/products/10-getProductById');
const {getValidSizes, getAvailableSizes} = require('../db/queries/products/06-getValidSizes');

module.exports = (db) => {
  router.get("/", (req, res) => {

    const f1 = getAllProducts(db);
    const f2 = getCategories(db);
    const f3 = getStyles(db);
    const f4 = getColors(db);
    const f5 = getSizes(db);
    const f6 = getAvailableSizes(db);

    Promise.all([f1, f2, f3, f4, f5, f6])
    .then(([r1, r2, r3, r4, r5, r6]) => {
      const products = r1.rows;
      const categories = r2.rows;
      const styles = r3.rows;
      const colors = r4.rows;
      const sizes = r5.rows;
      const availableSizes = r6.rows;
      res.json({ products, categories, styles, colors, sizes, availableSizes });
      return;
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });;
  });

  router.get("/:id", (req, res) => {
    const curId = req.params.id;
    const f1 = getProductById(db, curId);

    Promise.all([f1])
    .then(([r1]) => {
      const product = r1.rows[0];
      res.json({ product });
      return;
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });;
  });

  router.post("/", (req, res) => {
    const newProduct = (req.body.product);
    const {sku, category_id, style_id, color_id,
      name, description, image1, image2, image3, price, disp} = newProduct;
    console.log(newProduct);
    getProductBySku(db, sku)
    .then(data => {
      if (data.rows[0]) {
        res.json({ errCode: 1001, errMsg: 'duplicate sku', sku: `${sku}` })
        return
      } else {
        addNewProduct(db, newProduct)
        .then((data) => {
          console.log('add done');
          res.json({ ...newProduct })
          return
        })
      }

    })
    // const  { id, category_id, style_id, color_id, size_id, name, description, image_url, price } = req.body;
    // console.log('data',{ id, category_id, style_id, color_id, size_id, name, description, image_url, price });
    // res.status(201).send({ id, category_id, style_id, color_id, size_id, name, description, image_url, price });
  });

  router.put("/:id", (req, res) => {
    const { product } = req.body;
    const id = req.params.id;

    console.log(product);
    console.log(id);

    updateById(db, id, product)
    .then (data => {
      res.json(data.rows[0])
      return
    })
    .catch(err => {
      console.log(err);
      res
      .status(500)
      .json({ error: err.message });
    });;
  })



  return router;
};
