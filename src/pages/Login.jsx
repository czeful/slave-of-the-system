import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await authLogin(email, password);
      console.log("Ответ сервера:", response); // Выведем весь response, чтобы точно видеть, что в нем
  
      // Если response содержит .data, достаем оттуда
      const data = response.data || response;  // Если data нет, берём весь response
      console.log("Декодированные данные:", data);
  
      if (data.token && data.user) {
        login(data.token, data.user);
        console.log("Токен сохранён, выполняем переход на /profile...");
        navigate("/profile");
      } else {
        throw new Error("Некорректный ответ сервера");
      }
    } catch (err) {
      setError("Ошибка авторизации: " + (err.response?.data?.message || "Проверьте данные"));
      console.error("Ошибка логина:", err);
    }
  };

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
        <button type="button" onClick={() => navigate("/register")}>Создать аккаунт</button>
      </form>
    </div>
  );
}

export default Login;
