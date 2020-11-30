const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT * FROM food_orders
    JOIN orders ON orders.id = order_id
    JOIN foods ON foods.id = food_id
    JOIN users ON users.id = user_id
    WHERE users.id = 1
    ;`)
      .then(data => {
        const order = data.rows[0];
        const name = order.name;
        const time = order.order_date;
        console.log(name, time);
        res.json({ order });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// router.get("/", (req, res) => {
//   res.render("checkout");
// });

// // router.get("/submit", (req, res) => {
// //   res.render("confirmation");
// // })

// module.exports = router;
