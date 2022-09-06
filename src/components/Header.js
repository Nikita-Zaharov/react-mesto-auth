import React from "react";
import mesto_logo from "../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";
import MenuMobile from "./MenuMobile";
import closeBtn from "../images/CloseIcon.svg";
import burgerBtn from "../images/burger.svg";

function Header({ email, onSignOut, isOpen, onBurgerButton }) {
  return (
    <>
      <MenuMobile email={email} onSignOut={onSignOut} isOpen={isOpen} />
      <header className="header">
        <img className="header__logo" src={mesto_logo} alt="Лого" />
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route>
            <div className="header__info-box">
              <p className="header__nickname">{email}</p>
              <Link
                to="/sign-in"
                onClick={onSignOut}
                className="header__account-exit"
              >
                Выйти
              </Link>
              <button
                className="header__burger-button"
                type="button"
                onClick={onBurgerButton}
                style={{
                  backgroundImage: `url(${isOpen ? closeBtn : burgerBtn})`,
                }}
              ></button>
            </div>
          </Route>
        </Switch>
      </header>
    </>
  );
}

export default Header;
