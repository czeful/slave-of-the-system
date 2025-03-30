import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      console.log("AuthContext загружен, user:", JSON.parse(storedUser)); // Лог при загрузке
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token, userData) => {
    const newUser = { token, ...userData };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    console.log("Логин выполнен, новый user:", newUser); // Лог при логине
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    console.log("Выход из аккаунта, user сброшен");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

