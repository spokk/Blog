import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
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
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { error } = this.state;

    return (
      <div className="register">
        <div className="container">
          <h1>Sign Up</h1>
          <form className="form" onSubmit={this.onSubmit}>
            <div className="form__group">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.onChange}
                  required
                />
                {error.name && <span className="">{error.name}</span>}
              </label>
            </div>
            <div className="form__group">
              <label>
                E-mail
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
                />
                {error.email && <span className="">{error.email}</span>}
              </label>
            </div>
            <div className="form__group">
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  required
                />
                {error.password && <span className="">{error.password}</span>}
              </label>
            </div>
            <div className="form__group">
              <label>
                Confirm password
                <input
                  type="password"
                  name="password2"
                  placeholder="Confirm password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  required
                />
                {error.password2 && <span className="">{error.password2}</span>}
              </label>
            </div>
            <div className="form__group">
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(withRouter(Register));
