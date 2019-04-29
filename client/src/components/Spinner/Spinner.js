import React from 'react';
import loader from './page-loader.gif';

import './Spinner.sass';

function Spinner() {
  return (
    <div className="spinner__wrapper">
      <img className="spinner__img" src={loader} alt="loader" title="loading..." />
    </div>
  );
}

export default Spinner;
