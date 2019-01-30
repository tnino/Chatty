import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="navcount">Client Count:</p>
          {/* {this.state.clientCount} */}
          </nav>
      </div>
    );
  }
}
export default Navbar;
