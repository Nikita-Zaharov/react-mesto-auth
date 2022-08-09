import React from "react";
import mesto_logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={mesto_logo} alt="Лого" />
    </header>
  );
}

export default Header;
