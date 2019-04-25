import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { searchPosts } from '../../actions/searchActions';

class Header extends Component {
  state = {
    search: '',
    error: {}
  };
  onLogout = () => {
    this.props.logoutUser(this.props.history);
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSearch = () => {
    this.props.searchPosts(this.state.search, this.props.history);
  };
  render() {
    const { isAuth, user } = this.props.auth;
    const isDisabled = this.state.search.length === 0 ? 'disabled' : false;

    const guestLinks = (
      <>
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
      </>
    );

    const userLinks = isAuth && (
      <>
        <li className="navbar__item">
          <Link to="/create" className="logo header__logo">
            Create post
          </Link>
        </li>
        <li className="navbar__item">
          <Link to={`/user/${user.id}`} className="navbar__link">
            {user.name}
          </Link>
        </li>
        <li className="navbar__item">
          <button onClick={this.onLogout}>Logout</button>
        </li>
      </>
    );

    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <nav className="navbar">
              <div className="navbar__mobile-btn header-btn">
                <span className="header-btn__line" />
                <span className="header-btn__line" />
                <span className="header-btn__line" />
              </div>
              <ul className="navbar__list">
                <li className="navbar__item">
                  <Link to="/" className="logo header__logo">
                    Home
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/about" className="logo header__logo">
                    About
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/users" className="logo header__logo">
                    Users
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/contacts" className="logo header__logo">
                    Contacts
                  </Link>
                </li>
                {isAuth ? userLinks : guestLinks}
              </ul>
              <div className="navbar__search-wrapper">
                <input type="text" className="navbar__search" name="search" onChange={this.onChange} />
                <button className="navbar__search-btn" onClick={this.onSearch} disabled={isDisabled}>
                  Search
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  searchPosts: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, searchPosts }
)(withRouter(Header));
