import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          <li><Link to="/login">Войти</Link></li>
          <li><Link to="/register">Регистрация</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
