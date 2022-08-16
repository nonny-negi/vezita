function isInPast(year, month, day, hour, minute) {
  const todayDate = Date.now();
  let reqDate = {};
  if (hour !== undefined) {
    reqDate = Date.UTC(year, month - 1, day, hour, minute);
  } else if (day !== undefined) {
    reqDate = Date.UTC(year, month - 1, day);
  } else {
    reqDate = Date.UTC(year, month);
  }
  return reqDate < todayDate;
}

function is24HoursInAdvance(year, month, day, hour, minute) {
  const todayDate = new Date(Date.now());
  const plus24Hours = todayDate.setUTCHours(todayDate.getUTCHours() + 24);
  const reqDate = Date.UTC(year, month - 1, day, hour, minute);
  return reqDate > plus24Hours;
}

function isInBookableTimeframe(year, month, day, hour, minute) {
  if (hour !== undefined) {
    const reqDate = new Date(Date.UTC(year, month - 1, day, hour, minute));
    const reqDay = reqDate.getUTCDay();
    if (reqDay === 6 || reqDay === 0) return false; // 6 is Saturday, 0 is Sunday.
    const reqHour = reqDate.getUTCHours();
    if (reqHour < 9 || reqHour > 17) return false;
  } else {
    const reqDate = new Date(Date.UTC(year, month - 1, day));
    const reqDay = reqDate.getUTCDay();
    if (reqDay === 6 || reqDay === 0) return false; // 6 is Saturday, 0 is Sunday.
  }
  return true;
}

function checkMissingInputs(year, month, day, hour, minute) {
  if (!year)
    return { success: false, message: "Request is missing parameter: year" };
  if (!month)
    return { success: false, message: "Request is missing parameter: month" };
  if (!day)
    return { success: false, message: "Request is missing parameter: day" };
  if (!hour)
    return { success: false, message: "Request is missing parameter: hour" };
  if (!minute)
    return { success: false, message: "Request is missing parameter: minute" };
}

function validateBooking(year, month, day, hour, minute) {
  const missingInputs = checkMissingInputs(year, month, day, hour, minute);
  if (missingInputs) return missingInputs;
  if (isInPast(year, month, day, hour, minute))
    return { success: false, message: "Cannot book time in the past" };
  if (!isInBookableTimeframe(year, month, day, hour, minute))
    return {
      success: false,
      message: "Cannot book outside bookable timeframe",
    };
  if (!is24HoursInAdvance(year, month, day, hour, minute))
    return {
      success: false,
      message: "Cannot book with less than 24 hours in advance",
    };
  return { success: true };
}

function validateGetTimeslots(year, month, day) {
  const missingInputs = checkMissingInputs(year, month, day, "0", "0");
  if (missingInputs) return missingInputs;
  if (isInPast(year, month, day, undefined, undefined))
    return {
      success: false,
      message: "No timeslots are available in the past",
    };
  if (!isInBookableTimeframe(year, month, day, undefined, undefined))
    return {
      success: false,
      message: "No timeslots exist outside bookable timeframe",
    };
}

function validateGetDays(year, month) {
  const missingInputs = checkMissingInputs(year, month, "0", "0", "0");
  if (missingInputs) return missingInputs;
  if (isInPast(year, month, undefined, undefined, undefined))
    return {
      success: false,
      message: "No timeslots are available in the past",
    };
}

module.exports = {
  checkMissingInputs,
  validateBooking,
  validateGetTimeslots,
  validateGetDays,
};
