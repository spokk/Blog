const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Email is required';
  else {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //Email validation pattern
    let email = data.email;
    if (!pattern.test(email)) {
      errors.email = 'Email is not valid';
    }
  }
  if (isEmpty(data.password)) errors.password = 'Password is required';
  else {
    if (data.password.length < 6 || data.password.length > 25) {
      errors.password = 'Password must be between 6 and 25 characters';
    }
  }

  return {
    errors,
    isValid: !Object.keys(errors).length //if errors obj is empty - return true
  };
};
