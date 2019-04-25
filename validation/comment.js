const isEmpty = require('./isEmpty');

module.exports = function validateCommentInput(data) {
  let errors = {};

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
