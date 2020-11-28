const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/login/:user_id", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// router.get('/login/:id', (req, res) => {
//   req.session.user_id = req.params.id;
//   res.redirect('/home');
// });
