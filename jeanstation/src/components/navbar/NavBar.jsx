import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          JEANS STATION
        </div>
        <div className="navbar-buttons">
          <button className="nav-button">Sign In</button>
        <button className="nav-button">SignUp</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
