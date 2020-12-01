const express = require('express');
const router  = express.Router();

// VIEW MENU

module.exports = (db) => {
router.post("/",(req, res) => {
  const price = req.body.price;
  const quantity = req.body.quantity;
  const id = req.body.itemID;
  const total = price * quantity;
  console.log(req.body)
  db.query(`INSERT INTO order_items (order_id,item_id, quantity,order_items_total) VALUES (1,${id},${quantity},${total});`)
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});
router.get("/", (req, res) => {
   db.query('SELECT * FROM items ORDER BY id;')
   .then(data => {
    let a = [];
    for (let item of data.rows)
    {
      a.push({id : item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              url: item.food_pic_url});
    }

   const templateVars =  {
      imageURL : a
   }

   res.render("menu",templateVars);

   })
   .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


return router;

};
