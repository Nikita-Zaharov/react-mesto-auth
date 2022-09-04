import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Login({ onLogin }) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onLogin({ email, password }).then(reset);
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/users/me");
    }
  });
  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <input
          type="email"
          className="login__input"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login__input"
          placeholder="Пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__button">Войти</button>
      </form>
    </div>
  );
}

export default Login;
