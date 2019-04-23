import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
  onLogout = () => {
    this.props.logoutUser(this.props.history);
  };
  render() {
    const { isAuth, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar__list">
        <li className="navbar__item">
          <Link to="/register" className="navbar__link">
            Sign up
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/login" className="navbar__link">
            Sign in
          </Link>
        </li>
      </ul>
    );

    const userLinks = isAuth && (
      <>
        <div className="navbar__search-wrapper">
          <input type="text" className="navbar__search" />
          <button className="navbar__search-btn" onClick={null}>
            Search
          </button>
        </div>
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to={`/user/${user.id}`} className="navbar__link">
              {user.name}
            </Link>
          </li>
          <li className="navbar__item">
            <button onClick={this.onLogout}>Logout</button>
          </li>
        </ul>
      </>
    );

    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Link to="/" className="logo header__logo">
              Home
            </Link>
            <Link to="/create" className="logo header__logo">
              Post
            </Link>
            <nav className="navbar">
              <div className="navbar__mobile-btn header-btn">
                <span className="header-btn__line" />
                <span className="header-btn__line" />
                <span className="header-btn__line" />
              </div>
              {isAuth ? userLinks : guestLinks}
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Header));
