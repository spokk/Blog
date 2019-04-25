import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/userActions';

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
        <div key={i}>
          <img src={avatar.length ? avatar : defaultAvatar} width="100" alt="avatar" />
          <p>name: {name}</p>
          <p>email: {email}</p>
          <Link to={`/user/${_id}`}>{name} link</Link>
        </div>
      );
    });
    return (
      <>
        <h2>All users</h2>
        {usersList}
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
