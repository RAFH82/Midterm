const express = require('express');
const router  = express.Router();

router.get("/", (req, res) => {
  res.render("checkout");
});

router.get("/submit", (req, res) => {
  res.render("confirmation");
})

module.exports = router;
