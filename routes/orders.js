/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const {addToOrders} = require('../db/queries/orders/01-addToOrders');
const {addToLineItems} = require('../db/queries/orders/02-addToLineItems');

module.exports = (db) => {
  // router.get("/", (req, res) => {

  //   const f1 = getAllProducts(db);

  //   Promise.all([f1])
  //   .then(([r1]) => {
  //     const products = r1.rows;
  //     res.json({ products });
  //     return;
  //   })
  //   .catch(err => {
  //     res
  //     .status(500)
  //     .json({ error: err.message });
  //   });
  // });


  router.post("/", (req, res) => {
    const cart = (req.body.cart);
    const subtotal = (req.body.subtotal);

    // console.log(newOrder , subtotal);

    addToOrders(db, subtotal)
    .then(order => {
      const orderId = order.rows[0].id
      return orderId;
    })
    .then(orderId => {
      // create a list of promises for adding items to line_items table
      const addItemPromise = [];
      for (const item in cart) {
        addItemPromise.push(addToLineItems(db, cart[item], orderId));
      }
      Promise.all(addItemPromise)
      .then ( data => {
        console.log('✅ All items added to DB');                // 🚨🚨🚨
        res.json({ data });
        return;
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      });
    })
  });

  return router;
};
