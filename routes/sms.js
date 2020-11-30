const express = require('express');
const router  = express.Router();
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '70383c0f',
  apiSecret: 'UiM45z2qA0PYRemk',
});

let templateVars;

router.get("/", (req, res) => {
  const from = '14372661743';
  const to = '15872204300';
  const text = 'Sending order to restaurant....';

  nexmo.message.sendSms(from, to, text);
  res.render("smsSend");
});

router.get("/smsReceive", (req, res) => {
  if (!templateVars) {
    res.render("orderNotReady")
  } else {
    res.render("smsReceive", templateVars);
  }
});

router.post("/smsReceive", (req, res) => {
  const params = Object.assign(req.query, req.body)
  const text = params.text;
  templateVars = { text };
  console.log(templateVars);
  res.render("smsReceive", templateVars);
  res.status(200).send()
});

router.post("/delivery", (req,res) => {
  res.status(200).send('received msg');
});

module.exports = router;
