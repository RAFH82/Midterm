require('dotenv').config();
const express = require('express');
const router  = express.Router();
const Nexmo = require('nexmo');
const { utcTimeChange, textOrder } = require('../public/scripts/helpers');

const nexmo = new Nexmo({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

// Will not repeatedly send texts upon page refresh if they have been already sent once
let textSent = false;

module.exports = (db) => {

  router.get("/submit", (req, res) => {
    db.query(`
    SELECT users.name AS user,
    orders.id AS orderId,
    SUM(order_items.quantity) AS itemQuantity,
    order_items_total AS totalOrderItems,
    items.name AS itemName,
    orders.order_total AS totalOrderCost
    FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN items ON items.id = item_id
    JOIN users ON users.id = user_id
    WHERE orders.id = 1
    GROUP BY orders.id, users.name, order_items_total, items.name;
    ;`)
      .then(data => {
        // Order details
        let orderArr = [];
        const order = data.rows
        for (let item of order) {
          orderArr.push({
            itemQuantity: item.itemquantity,
            totalCostOfItems: item.totalorderitems,
            itemName: item.itemname,
          });
        }
        // Order fields that will remain the same
        const name = order[0].user;
        const order_id = order[0].orderid;
        const orderTotal = order[0].totalordercost;

        // Time change logic
        const time = Date.now();
        const timeStamp = utcTimeChange(time, "Europe/London", "America/Vancouver");

        const templateVars = { orderArr, name, order_id, orderTotal, timeStamp, };

        if (textSent === false) {

        // Sending SMS with order details to restaurant
        const from = '16045952801';
        const to = '15872204300';

        // Order details
        const orderDetails = textOrder(orderArr);
        const text = `Order_id: #${order_id}\nFor: ${name}\n${orderDetails}\n${timeStamp}`;

        // Once text is sent this prevents repeats
        textSent = true;

        // Nexmo Sends the sms
        nexmo.message.sendSms(from, to, text);
        }

        // Then loads the confirmation page with the order details
        res.render("confirmation", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    db.query(`
    SELECT users.name AS user,
    orders.id AS orderId,
    SUM(order_items.quantity) AS itemQuantity,
    order_items_total AS totalOrderItems,
    items.name AS itemName,
    orders.order_total AS totalOrderCost
    FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN items ON items.id = item_id
    JOIN users ON users.id = user_id
    WHERE orders.id = 1
    GROUP BY orders.id, users.name, order_items_total, items.name;
    ;`)
      .then(data => {
        // Order details
        const order = data.rows
        const name = order[0].user;
        const templateVars = { name };
        res.render("checkout", templateVars);
      });
  });

  return router;
};

