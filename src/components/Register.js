import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

function Register({ onRegister }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function reset() {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    onRegister({ email, password }).then(reset);
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/sign-in");
    }
  });

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Регистрация</h2>
        <input
          type="email"
          className="register__input"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="register__input"
          placeholder="Пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register__button">Зарегистрироваться</button>
        <p className="register__text">
          Уже зарегистрированы?
          <Link to="/sign-in" className="register__link">
            &nbsp;Войти
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
