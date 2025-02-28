import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {register as authREgister} from "../services/authService"
import "../styles/register.css"

function Register() {
  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("")
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Отправляем данные регистрации на API
      const response = await authREgister(name, email, phone_number, password, confirm_password)
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      navigate("/otp");
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
          <label>Номер телефона:</label>
          <input
            type="tel"
            placeholder="Введите номер телефона"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
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
        <div className="form-group">
          <label>Повторите пароль:</label>
          <input
            type="password"
            placeholder="Повторите пароль"
            value={confirm_password}
            onChange={(e) => setConfirm_password(e.target.value)}
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
