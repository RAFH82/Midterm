const express = require('express');
const router  = express.Router();

// VIEW MENU

module.exports = (db) => {
router.post("/",(req, res) => {
  const price = req.body.price;
  const quantity = req.body.quantity;
  const id = req.body.itemID;
  const total = price * quantity;
  // console.log(req.body)
<<<<<<< HEAD
  db.query(`SELECT item_id FROM order_items WHERE order_id = 1`)
  .then(data => {
=======
  db.query(`SELECT item_id FROM order_items WHERE order_id = 1 and item_id = ${id};`)
  .then(data => {

>>>>>>> 29e95baadd1910eca0a460543ce6458098f6764a
    let b = [];
    for (let item of data.rows) {
      b.push({...item});
    }
<<<<<<< HEAD
    console.log("menu", b); //menu [ { item_id: 1 } ]
=======
    console.log("menu", b);
>>>>>>> 29e95baadd1910eca0a460543ce6458098f6764a
    if(b.length === 0) {
    db.query(`INSERT INTO order_items (order_id,item_id, quantity,order_items_total) VALUES (1,${id},${quantity},${total});`)
    .then(data => {
      res.status(200);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
<<<<<<< HEAD
  }
  else if (b.length !== 0){
  for (const c of b) {
    console.log("foodid",id, "bitems",c.item_id)
    if (id !== c.item_id) {
      db.query(`INSERT INTO order_items (order_id,item_id, quantity,order_items_total) VALUES (1,${id},${quantity},${total});`)
      .then(data => {
        res.status(200);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
  }
  }else {
=======

}

else {
>>>>>>> 29e95baadd1910eca0a460543ce6458098f6764a
  console.log("executed---");
  db.query(`UPDATE order_items SET quantity =${quantity},order_items_total=${total} WHERE item_id=${id} and order_id = 1;`)
  .then(data=>{
    res.status(200);
  })
  .catch(err => {
    res
      .status(500)
     .json({ error: err.message });

  });
}

<<<<<<< HEAD

=======
>>>>>>> 29e95baadd1910eca0a460543ce6458098f6764a
  })
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
