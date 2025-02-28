import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {login as authLogin} from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css"



function Login() {
  const {login: setAuth} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authLogin(email , password);
      setAuth(response.data.token);
      navigate("/profile"); // Перенаправляем на страницу профиля
    } catch (err) {
      setError("Ошибка авторизации: " + (err.response?.data?.message || "Проверьте данные"));
    }
  };
  // const handleRegistr = () => {
  //       navigate("/register");
  // }

  return (
    <div className="auth-container">
      <h2>Вход</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
        <button onClick={() => navigate("/register")}>Создать аккаунт</button>
      </form>
    </div>
  );
}

export default Login;
