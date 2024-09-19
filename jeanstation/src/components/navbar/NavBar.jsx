import React from 'react';

import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
const navigate=useNavigate();
const handlesignup=()=>{
  navigate('/signup')
}
const handlesignin=()=>{
  navigate('/signin')
}
const handlelogout=()=>{
  navigate('/logout')
}

const handlecart=()=>{
  navigate('/cart')
}


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
        <a > <Link to="/">Jean Station</Link> </a>
        </div>
        <div className="navbar-buttons">
        <button className="nav-button" onClick={handlecart}>Cart</button>
          <button className="nav-button" onClick={handlesignin}>Sign In</button>
          <button className="nav-button"onClick={handlesignup} >SignUp</button>
          <button className="nav-button"onClick={handlelogout} >LogOut</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;



