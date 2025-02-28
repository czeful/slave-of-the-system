import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const login = async (email, password) =>{
    return axios.post(`${API_URL}/login`, {email, password});
};

export const register = async (name, email, phone_number, password, confirm_password) => {
    return axios.post(`${API_URL}/reg` ,{name, email, phone_number, password, confirm_password});
};

export const logout = () =>{
    localStorage.removeItem("token");
};

export const verifyOTP = async (email, otp) => {
    console.log("Отправка verifyOTP с:", email, otp);
    return axios.post(`${API_URL}/verify-otp`, { email, otp });
  };