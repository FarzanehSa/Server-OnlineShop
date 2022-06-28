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
      // res
      // .status(500)
      // .json({ error: 'err.message' });
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });;
  });

  router.post("/", (req, res) => {
    const  { id, category_id, style_id, color_id, size_id, name, description, image_url, price } = req.body;
    console.log('data',{ id, category_id, style_id, color_id, size_id, name, description, image_url, price });
    res.status(201).send({ id, category_id, style_id, color_id, size_id, name, description, image_url, price });
  });





  return router;
};
