import React, { Component } from 'react';
import './Footer.sass';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="footer__copyright">Sviatoslav Bondar © {new Date().getFullYear()}</p>
        </div>
      </footer>
    );
  }
}
