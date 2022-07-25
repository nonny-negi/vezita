function getLastDayOfMonth(year, month) {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

function getCurrDateUTC() {
  const currDate = new Date();
  return currDate.getUTCDate();
}

function getDateFromISO(dateISOString) {
  const date = new Date(dateISOString);
  return date.getUTCDate();
}

function getNextDay(date) {
  let tomorrow = new Date(date);
  tomorrow.setDate(date.getUTCDate() + 1);
  return new Date(tomorrow);
}

function makeEventResource(date, startTime, endTime) {
  return {
    summary: "appointment",
    start: {
      dateTime: date + startTime,
      timeZone: "UTC",
    },
    end: {
      dateTime: date + endTime,
      timeZone: "UTC",
    },
  };
}

module.exports = {
  getLastDayOfMonth,
  getCurrDateUTC,
  getDateFromISO,
  getNextDay,
  makeEventResource,
};
