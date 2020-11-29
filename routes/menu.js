const express = require('express');
const router  = express.Router();

// VIEW MENU

module.exports = (db) => {
router.get("/", (req, res) => {
   db.query('SELECT * FROM foods ORDER BY id;')
   .then(data => {
    let a = [];
    for (let item of data.rows)
    {
      a.push({name: item.name,
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
