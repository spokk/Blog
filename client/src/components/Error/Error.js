import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/postActions';

//clear errors

class Error extends Component {
  componentDidMount() {
    this.props.clearErrors();
  }
  render() {
    return <div>Error</div>;
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
