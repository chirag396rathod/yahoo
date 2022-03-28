import React from "react";
import logo from "../images/logo.png";
import './header.scss';

const Header = () => {
  return (
    <header>
      <div className="head">
        <div className="logos">
          <img src={logo} alt="logos" />
        </div>
        <a href="#">Help</a>
      </div>
    </header>
  );
};

export default Header;