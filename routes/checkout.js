require('dotenv').config();
const express = require('express');
const router  = express.Router();
const Nexmo = require('nexmo');
const { utcTimeChange } = require('../public/scripts/helpers');

const nexmo = new Nexmo({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

let textSent = false;

module.exports = (db) => {

  router.get("/submit", (req, res) => {
    db.query(`
    SELECT * FROM order_items
    JOIN orders ON orders.id = order_id
    JOIN items ON items.id = item_id
    JOIN users ON users.id = user_id
    WHERE users.id = 1
    ;`)
      .then(data => {
        // Order details
        const order = data.rows[0];
        const name = order.name;
        const time = Date.now();
        const timeStamp = utcTimeChange(time, "Europe/London", "America/Vancouver");
        const order_id = order.order_id;
        const templateVars = { order, name, timeStamp, order_id };
        if (textSent === false) {
          // Sending SMS with order details to restaurant
        const from = '16045952801';
        const to = '15872204300';
        const text = `Order_id: ${order_id}, For: ${name} Time: ${timeStamp}`;
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
    res.render("checkout");
  });

  return router;
};



// router.get("/submit", (req, res) => {


// })

// module.exports = router;
