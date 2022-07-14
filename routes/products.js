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
const {getAvailableSizesById} = require('../db/queries/products/06-getAvailableSizesById');
const {findProductBySku} = require('../db/queries/products/07-findProductBySku');
const {addNewProduct} = require('../db/queries/products/08-addNewProduct');
const {updateById} = require('../db/queries/products/09-updateById');
const {getProductById} = require('../db/queries/products/10-getProductById');
const {findBarcodeInProductSizeTable} = require('../db/queries/products/11-findBarcodeInProductSizeTable');
const {addNewProductSize} = require('../db/queries/products/12-addNewProductSize');
const {setQtyInventory} = require('../db/queries/products/13-setQtyInventory');
const {getValidSizes, getAvailableSizes} = require('../db/queries/products/06-getAvailableSizesById');

module.exports = (db) => {
  router.get("/", (req, res) => {

    const f1 = getAllProducts(db);
    const f2 = getCategories(db);
    const f3 = getStyles(db);
    const f4 = getColors(db);
    const f5 = getSizes(db);

    Promise.all([f1, f2, f3, f4, f5])
    .then(([r1, r2, r3, r4, r5]) => {
      const products = r1.rows;
      const categories = r2.rows;
      const styles = r3.rows;
      const colors = r4.rows;
      const sizes = r5.rows;
      res.json({ products, categories, styles, colors, sizes });
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
    const f2 = getAvailableSizesById(db, curId);

    Promise.all([f1, f2])
    .then(([r1, r2]) => {
      const product = r1.rows[0];
      const availableSizes = r2.rows;
      res.json({ product, availableSizes });
      return;
    })
    .catch(err => {
      console.log(err.message);
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
    findProductBySku(db, sku)
    .then(data => {
      if (data.rows[0]) {
        res.json({ errCode: 1001, errMsg: 'duplicate sku', sku: `${sku}` })
        return
      } else {
        return addNewProduct(db, newProduct)
        .then(item => {
          console.log('Add done');
          return getProductById(db, item.rows[0].id)
        })
        .then(data => {
          console.log(data.rows[0]);
          res.json(data.rows[0])
          return
        })
      }
    })
    .catch(err => {
      console.log(err);
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.post("/barcode", (req, res) => {
    const newBarcode = (req.body.row);
    const {barcode, sku, size_id, quantity} = newBarcode;

    console.log(newBarcode);
    findProductBySku(db, sku)
    .then(data => {
      if (!data.rows[0]) {
        res.json({ errCode: 1002, errMsg: ` SKU #${sku} Does Not Exist!`})
        return
      } else {
        const productId = data.rows[0].id;
        return findBarcodeInProductSizeTable(db, barcode)
        .then (data2 => {
          if (data2.rows[0]) {
            res.json({ errCode: 1003, errMsg:` Duplicate Barcode #${barcode}`})
            return
          } else {
            const f1 = addNewProductSize(db, barcode, productId, size_id);
            const f2 = setQtyInventory(db, barcode, quantity);

            Promise.all([f1,f2])
            .then(([r1, r2]) => {
              res.json({barcode, sku, size_id, quantity});
              return;
            })
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
      res
      .status(500)
      .json({ error: err.message });
    });
  });

  router.put("/:id", (req, res) => {
    const { product } = req.body;
    const id = req.params.id;

    updateById(db, id, product)
    .then (() => {
      console.log('Edit done');
      return getProductById(db, id)
    })
    .then(data => {
      console.log(data.rows[0]);
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
