const isEmpty = require('./isEmpty');

module.exports = function validatePostInput(data) {
  let errors = {};

  if (isEmpty(data.header)) errors.header = 'Header is required';
  else {
    if (data.header.length < 4 || data.header.length > 50) {
      errors.header = 'Header must be between 4 and 50 characters';
    }
  }
  if (isEmpty(data.text)) errors.text = 'Text is required';
  else {
    if (data.text.length < 10 || data.text.length > 3000) {
      errors.text = 'Text must be between 10 and 3000 characters';
    }
  }

  return {
    errors,
    isValid: !Object.keys(errors).length //if errors obj is empty - return true
  };
};
