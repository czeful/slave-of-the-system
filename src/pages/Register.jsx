import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {register as authREgister} from "../services/authService"
import "../styles/register.css"

function Register() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [phone_number, setPhone_number] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Регистрация началась..."); // ✅ Должно появиться в консоли

    setError("");

    try {
      // Отправляем данные регистрации на API
      console.log("Отправляем данные на сервер:", { name, email, password });
      navigate("/login");
      const response = await authREgister(name, email, password)
      console.log("Ответ от сервера:", response.data);
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
    } catch (err) {
      setError("Ошибка регистрации: " + (err.response?.data?.message || "Проверьте введённые данные"));

    }
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Имя пользователя:</label>
          <input
            type="text"
            placeholder="Введите имя пользователя"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-btn">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Register;
