import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/postActions';

import errorImg from './404.jpg';

import './Error.sass';

class Error extends Component {
  componentDidMount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <div className="error">
        <img className="error__img" src={errorImg} alt="404" />
        <Link className="error__link" to="/">
          Back to feed
        </Link>
      </div>
    );
  }
}

Error.propTypes = {
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(
  mapStateToProps,
  { clearErrors }
)(withRouter(Error));
