import React from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен
    navigate("/login"); // Перенаправляем на страницу входа
  };

  return (
    <div>
      <h2>Добро пожаловать!</h2>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
}

export default Profile;
