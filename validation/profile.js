const isEmpty = require('./isEmpty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  if (isEmpty(data.name)) errors.name = 'Name is required';
  else {
    if (data.name.length < 4 || data.name.length > 25) {
      errors.name = 'Name must be between 2 and 25 characters';
    }
  }
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
  if (isEmpty(data.password2)) errors.password2 = 'Password confirmation is required';
  else {
    if (data.password !== data.password2) {
      errors.password2 = 'Passwords must match';
    }
  }
  return {
    errors,
    isValid: !Object.keys(errors).length //if errors obj is empty - return true
  };
};
