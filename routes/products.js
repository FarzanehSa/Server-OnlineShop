/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const {getAllProducts} = require('../db/queries/products/01-getAllProducts');

module.exports = (db) => {
  router.get("/", (req, res) => {

    const f1 = getAllProducts(db);

    Promise.all([f1])
    .then(([r1]) => {
      const products = r1.rows;
      res.json({ products });
      return;
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
