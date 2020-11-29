const express = require('express');
const router  = express.Router();

// VIEW MENU
router.get("/", (req, res) => {
  res.render("menu");
});

module.exports = router;
