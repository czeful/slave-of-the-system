import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token); // Сохраняем токен
      navigate("/profile"); // Перенаправляем на страницу профиля
    } catch (err) {
      setError("Ошибка авторизации: " + (err.response?.data?.message || "Проверьте данные"));
    }
  };
  const handleRegistr = () => {
        navigate("/register");
  }

  return (
    <div>
      <h2>Авторизация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Войти</button>
        <button type="submit" onClick={handleRegistr}>Создать аккаунт</button>
      </form>
    </div>
  );
}

export default Login;
