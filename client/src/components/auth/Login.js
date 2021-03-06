import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

import './Sign.sass';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuth) this.props.history.push('/');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        error: nextProps.error
      });
    }
    if (nextProps.auth.isAuth) this.props.history.push('/');
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  };

  render() {
    const { error } = this.state;
    return (
      <div className="sign">
        <div className="container">
          <h1 className="sign__header">Sign In</h1>
          <form className="sign__form" onSubmit={this.onSubmit}>
            <div>
              <label>
                <p className="sign__label">E-mail</p>
                <input
                  className="sign__input"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
                {error.email && <span className="sign__error">{error.email}</span>}
              </label>
            </div>
            <div>
              <label>
                <p className="sign__label">Password</p>
                <input
                  className="sign__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
                {error.password && <span className="sign__error">{error.password}</span>}
              </label>
            </div>
            <div className="sign__submit-wrapper">
              <input className="sign__submit" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
