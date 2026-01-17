//testing
function validateEmail(email) {
  return email !== "";
}

function validatePassword(password) {
  return password !== "";
}

function validateActivityDuration(hours, minutes) {
  return parseInt(hours) !== 0 || parseInt(minutes) !== 0;
}

module.exports = {
    validateEmail,
    validatePassword,
    validateActivityDuration
  };