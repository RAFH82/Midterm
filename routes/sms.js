const express = require('express');
const router  = express.Router();
const moment = require('moment-timezone');

// For SMS API
const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: '70383c0f',
  apiSecret: 'UiM45z2qA0PYRemk',
});

let templateVars;

router.get("/smsReceive", (req, res) => {
  if (!templateVars) {
    res.render("orderNotReady")
  } else {
    const from = '14372661743';
    const to = '15872204300';
    const text = `Restaurant Response: ${templateVars.text}. This response was sent at ${templateVars.timeStamp}`;
    // Nexmo Sends the sms
    nexmo.message.sendSms(from, to, text);
    res.render("smsReceive", templateVars);
  }
});

// This is the response from the webhook url when the restaurant responds via SMS
router.post("/smsReceive", (req, res) => {
  const params = Object.assign(req.body)
  const text = params.text;
  const UTCDateTime = params['message-timestamp'];
  const timeStamp = (moment.tz(UTCDateTime, "Europe/London")).tz("America/Vancouver").format('YYYY-MM-DD LT');
  console.log(timeStamp);
  templateVars = { text, timeStamp };
  res.render("smsReceive", templateVars);
  res.status(200).send()
});

// Sends delivery status to Nexmo otherwise it will keep retrying
router.post("/delivery", (req, res) => {
  res.status(200).send('received msg');
});

module.exports = router;
