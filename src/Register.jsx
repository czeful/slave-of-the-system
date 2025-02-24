import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post("http://localhost:5000/api/reg", {
        name,
        email,
        phone_number,
        password,
        confirm_password
      });

      // Если регистрация успешна, можно автоматически авторизовать пользователя,
      // сохранив полученный токен или перенаправив на страницу входа
      localStorage.setItem("token", response.data.token);
      navigate("/profile");
    } catch (err) {
      setError("Ошибка регистрации: " + (err.response?.data?.message || "Проверьте введённые данные"));
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Имя пользователя:</label>
          <input
            type="text"
            placeholder="Введите имя пользователя"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone nymber:</label>
          <input
            type="phone number"
            placeholder="Введите номер телефона"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Повторите Пароль:</label>
          <input
            type="password"
            placeholder="Введите пароль"
            value={confirm_password}
            onChange={(e) => setConfirm_password (e.target.value)}
            required
          />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;
