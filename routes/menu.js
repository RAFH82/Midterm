const express = require('express');
const router  = express.Router();

// module.exports = (db) => {
  // VIEW MENU
  router.get("/", (req, res) => {
    console.log("reached the menu page")
    res.render("menu");
  });

module.exports = router;

