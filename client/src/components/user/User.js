import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, deleteUser } from '../../actions/userActions';

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
    } else this.props.history.push('/error');
  }

  render() {
    const { email, avatar, about, name, id, date } = this.state;
    const defaultAvatar = 'https://bizraise.pro/wp-content/uploads/2014/09/no-avatar-300x300.png';
    return (
      <div>
        <h1>User component</h1>
        <p>
          <img src={avatar.length ? avatar : defaultAvatar} width="100" alt="avatar" />
        </p>
        <p>name: {name}</p>
        <p>email: {email}</p>
        <p>about: {about}</p>
        <hr />
        <p>id: {id}</p>
        <p>date: {date}</p>
        <button onClick={this.onDelete}>delete</button> <Link to="/edit-user">edit</Link>
      </div>
    );
  }
}

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getUser, deleteUser }
)(withRouter(User));
