import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink /*, Link */ } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { searchPosts } from '../../actions/searchActions';

import './Header.sass';

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

  onMenuClick = () => {
    let mobileMenu = document.querySelector('.navbar__list');
    mobileMenu.classList.toggle('navbar__list--mobile-open');
  };

  onLinkClick = e => {
    let mobileMenu = document.querySelector('.navbar__list');
    if (e.target.tagName === 'A') mobileMenu.classList.remove('navbar__list--mobile-open');
  };

  render() {
    const { isAuth, user } = this.props.auth;
    const isDisabled = this.state.search.length === 0 ? 'disabled' : false;

    const guestLinks = (
      <>
        <li className="navbar__item">
          <NavLink to="/register" className="navbar__link" activeClassName="navbar__link--active">
            Sign up
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/login" className="navbar__link" activeClassName="navbar__link--active">
            Sign in
          </NavLink>
        </li>
      </>
    );

    const userLinks = isAuth && (
      <>
        <li className="navbar__item">
          <NavLink to="/create" className="navbar__link" activeClassName="navbar__link--active">
            Create post
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to={`/user/${user.id}`} className="navbar__link" activeClassName="navbar__link--active">
            {user.name}
          </NavLink>
        </li>
        <li className="navbar__item navbar__item--logout">
          <button onClick={this.onLogout} className="navbar__logout button--round" title="logout">
            <i className="fas fa-sign-out-alt" />
            <span className="ally">Logout</span>
          </button>
        </li>
      </>
    );

    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <nav className="navbar">
              <button className="navbar__mobile-btn header-btn button--round" onClick={this.onMenuClick}>
                <i className="fas fa-bars" />
              </button>
              <ul className="navbar__list" onClick={this.onLinkClick}>
                <li className="navbar__item">
                  <NavLink exact to="/" className="navbar__link" activeClassName="navbar__link--active">
                    Home
                  </NavLink>
                </li>
                <li className="navbar__item">
                  <NavLink to="/about" className="navbar__link" activeClassName="navbar__link--active">
                    About
                  </NavLink>
                </li>
                <li className="navbar__item">
                  <NavLink to="/users" className="navbar__link" activeClassName="navbar__link--active">
                    Users
                  </NavLink>
                </li>
                <li className="navbar__item">
                  <NavLink to="/contacts" className="navbar__link" activeClassName="navbar__link--active">
                    Contacts
                  </NavLink>
                </li>
                {isAuth ? userLinks : guestLinks}
              </ul>
              <div className="navbar__search-wrapper">
                <input type="text" className="navbar__search" name="search" onChange={this.onChange} />
                <button
                  className="navbar__search-btn button--round"
                  onClick={this.onSearch}
                  disabled={isDisabled}
                  title="search"
                >
                  <i className="fas fa-search" />
                  <span className="ally">Search</span>
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
