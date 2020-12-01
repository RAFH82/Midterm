const express = require('express');
const router  = express.Router();
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '70383c0f',
  apiSecret: 'UiM45z2qA0PYRemk',
});

module.exports = (db) => {

  router.get("/submit", (req, res) => {
    db.query(`
    SELECT * FROM food_orders
    JOIN orders ON orders.id = order_id
    JOIN foods ON foods.id = food_id
    JOIN users ON users.id = user_id
    WHERE users.id = 1
    ;`)
      .then(data => {
        // res.json({ order });
        // Order details

        const order = data.rows[0];
        const name = order.name;
        const time = order.order_date;
        const order_id = order.order_id;
        const templateVars = { order, name, time, order_id };
        // Sending SMS with order details to restaurant
        const from = '14372661743';
        const to = '15872204300';
        const text = `Order_id: ${order_id}, For: ${name} Time: ${time}`;
        // Nexmo Sends the sms
        nexmo.message.sendSms(from, to, text);
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
