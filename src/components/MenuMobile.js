import { Link } from "react-router-dom";
function MenuMobile({ email, onSignOut, isOpen }) {
  return (
    <div className={`menu-mobile ${isOpen ? "menu-mobile_opened" : ""}`}>
      <h2 className="menu-mobile__nickname">{email}</h2>
      <Link to="/sign-in" onClick={onSignOut} className="menu-mobile__exit">
        Выйти
      </Link>
    </div>
  );
}

export default MenuMobile;
