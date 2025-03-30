import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/profile.css";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.token) {
      navigate("/login");
      return;
    }

    try {
      const decodedToken = parseJwt(user.token);
      setUserData(decodedToken);
    } catch (error) {
      console.error("Ошибка декодирования токена:", error);
      logout();
      navigate("/login");
    }
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">MyApp</div>
        <div className="navbar-links">
          <a href="/profile">Профиль</a>
          <a href="/goals">Цели</a>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      </nav>

      <div className="profile-content">
        {/* Левый блок с аватаром и информацией */}
        <div className="profile-left">
          <div className="profile-header">
            <img
              className="cover-photo"
              src="https://source.unsplash.com/800x300/?nature,water"
              alt="Обложка профиля"
            />
            <img
              className="avatar"
              src="https://source.unsplash.com/150x150/?person,face"
              alt="Аватар пользователя"
            />
          </div>
          <div className="profile-info">
            <h2>{userData?.Username || "Пользователь"}</h2>
            <p><strong>📧 Email:</strong> {userData?.email}</p>
            <p><strong>🆔 ID:</strong> {userData?.user_id}</p>
          </div>
        </div>

        {/* Правый блок для дополнительных данных */}
        <div className="profile-right">
          <h3>Дополнительная информация</h3>
          {/* Можно добавить больше данных о пользователе, посты, сообщения и т.д. */}
        </div>
      </div>
    </div>
  );
}

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch (error) {
    console.error("Ошибка декодирования токена:", error);
    return null;
  }
}

export default Profile;
