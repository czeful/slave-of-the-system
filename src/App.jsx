import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import OTPForm from "./pages/OTPForm";
import Goals from "./pages/Goals";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user } = useContext(AuthContext);
  console.log("Проверка аутентификации в App:", user);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<OTPForm />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/profile" element={user?.token ? <Profile /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;


