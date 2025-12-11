import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">RechargeNow</h1>
      <ul className="nav-links">
        <li>Home</li>
        <li>Plans</li>
        <li>Offers</li>
        <li>Support</li>
      </ul>
    </nav>
  );
};

export default Navbar;
