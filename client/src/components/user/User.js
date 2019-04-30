import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, deleteUser, clearUser } from '../../actions/userActions';

import Spinner from '../Spinner/Spinner';

import './User.sass';

class User extends Component {
  state = {
    name: '',
    email: '',
    avatar: '',
    about: '',
    id: '',
    date: ''
  };

  onDelete = () => {
    if (window.confirm('Are you sure? This can NOT be undone!'))
      this.props.deleteUser(this.props.match.params.id, this.props.history);
  };

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      this.props.getUser(nextProps.match.params.id);
    } else if (nextProps.user.user) {
      const { email, avatar, about, name, id, date } = nextProps.user.user;
      this.setState({
        email,
        avatar,
        about,
        name,
        id,
        date
      });
    } else if (nextProps.user.user === null && !nextProps.user.loading) {
      this.props.history.replace('/error');
    }
  }

  componentWillUnmount() {
    this.props.clearUser();
  }

  render() {
    const { email, avatar, about, name } = this.state;
    const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
    const isAdmin = this.props.auth.user && this.props.auth.user.role === 'admin';
    const isAuth = this.props.auth.isAuth && this.props.auth.user.id === this.props.match.params.id;
    const profile = (
      <div className="profile">
        <h1 className="profile__header">Profile</h1>
        <img className="profile__avatar" src={avatar.length ? avatar : defaultAvatar} alt="avatar" />
        <div className="profile__info">
          <p className="profile__item">
            <span className="profile__title">name:</span> {name}
          </p>
          <p className="profile__item">
            <span className="profile__title">email:</span> {email}
          </p>
          <p className="profile__item">
            <span className="profile__title">about:</span> {about}
          </p>
        </div>
        <div className="profile__buttons">
          {isAuth && (
            <Link to="/edit-user" className="button--round profile__edit" title="edit user">
              <i className="fas fa-user-edit" />
              <span className="ally">edit user</span>
            </Link>
          )}
          {(isAuth || isAdmin) && (
            <button onClick={this.onDelete} className="button--round profile__delete" title="delete user">
              <i className="fas fa-user-times" />
              <span className="ally">delete user</span>
            </button>
          )}
        </div>
      </div>
    );

    return this.props.user.loading ? <Spinner /> : profile;
  }
}

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  error: state.error
});

export default connect(
  mapStateToProps,
  { getUser, deleteUser, clearUser }
)(withRouter(User));
