import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';

import './Users.sass';

class Users extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    this.props.getUsers();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.users) {
      this.setState({
        users: nextProps.user.users
      });
    }
  }
  render() {
    const usersList = this.state.users.map((user, i) => {
      const { email, avatar, name, _id } = user;
      const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
      return (
        <Link className="user" to={`/user/${_id}`} key={i}>
          <img
            className="user__avatar"
            src={avatar.length ? avatar : defaultAvatar}
            width="100"
            alt="avatar"
          />
          <div className="user__credentials">
            <p className="user__name">{name}</p>
            <p className="user__email">{email}</p>
          </div>
        </Link>
      );
    });
    return (
      <>
        <h2 className="users__header">All users</h2>
        <div className="users__wrapper">{usersList}</div>
      </>
    );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUsers }
)(withRouter(Users));
