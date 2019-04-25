import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="container">
          <p>Footer: Sviatoslav Bondar {new Date().getFullYear()}</p>
        </div>
      </footer>
    );
  }
}
