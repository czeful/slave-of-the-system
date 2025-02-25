import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // Проверяем, есть ли токен

  return (
    <AuthProvider>
    <Router>    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
