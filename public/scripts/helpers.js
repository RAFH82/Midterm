const moment = require('moment-timezone');

function utcTimeChange(timeStamp, fromTz, toTz) {
  const newDate = (moment.tz(timeStamp, fromTz)).tz(toTz).format('YYYY-MM-DD LT');
  return newDate;
};

module.exports = { utcTimeChange };
