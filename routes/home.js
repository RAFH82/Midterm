const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // res.render("home");
    console.log("Im inside the home render");
   db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows[0].name;
        console.log(users);
        // res.json({ users });
        const templateVars = {
          username : users
        };
        res.render('home', templateVars);

      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/login/:id", (req, res) => {
    req.session.user_id = req.params.id;
    console.log(req.session.user_id)
    db.query('SELECT * FROM users;')
    .then(data => {
       const users = data.rows[0].name;

      const templateVars = {
        username : users
      };
    res.render("home",templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.get("/register", (req, res) => {
    res.render("register");
  });
   router.post("/",(req, res) => {
    db.query('INSERT INTO orders (user_id) VALUES (1);')
    .then(data => {
      res.redirect('/menu');
    });



  });
  return router;

};

