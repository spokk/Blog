import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, editUser } from '../../actions/userActions';

class Edit extends Component {
  state = {
    name: '',
    email: '',
    avatar: '',
    about: '',
    password: '',
    password2: '',
    error: {}
  };

  componentDidMount() {
    if (!this.props.auth.isAuth) this.props.history.push('/');
    else this.props.getUser(this.props.auth.user.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.user) {
      const { email, avatar, about, name, id, date } = nextProps.user.user;
      this.setState({
        email,
        avatar,
        about,
        name,
        id,
        date
      });
    }
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

    const newInfo = {
      name: this.state.name,
      email: this.state.email,
      avatar: this.state.avatar,
      about: this.state.about,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.editUser(this.props.auth.user.id, newInfo, this.props.history);
  };

  render() {
    const { error } = this.state;

    return (
      <div className="register">
        <div className="container">
          <h1>Edit user</h1>
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
                Avatar
                <input
                  type="text"
                  name="avatar"
                  placeholder="Name"
                  value={this.state.avatar}
                  onChange={this.onChange}
                />
                {error.avatar && <span className="">{error.avatar}</span>}
              </label>
            </div>
            <div className="form__group">
              <label>
                About
                <input
                  type="text"
                  name="about"
                  placeholder="Name"
                  value={this.state.about}
                  onChange={this.onChange}
                />
                {error.about && <span className="">{error.about}</span>}
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

Edit.propTypes = {
  getUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser, editUser }
)(withRouter(Edit));
