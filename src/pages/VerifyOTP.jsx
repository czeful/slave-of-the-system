import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/authService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const email = localStorage.getItem("email");

  const handleVerifyOTP = async () => {
    setError("");

    try {
      console.log("Отправляем на сервер:", email, otp); 
      const response = await verifyOTP(email, otp);
      console.log("Ответ от сервера:", response);  
      localStorage.removeItem("email"); // Чистим email после успешного подтверждения
      navigate("/login"); // Перенаправляем на страницу входа
    } catch (err) {
      setError("Ошибка верификации OTP. Попробуйте снова.");
    }
  };

  return (
    <div className="otp-container">
      <h2>Подтверждение OTP</h2>
      {error && <p className="error-message">{error}</p>}
      <input type="text" placeholder="Введите OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
      <button onClick={handleVerifyOTP}>Подтвердить</button>
    </div>
  );
};

export default VerifyOTP;
