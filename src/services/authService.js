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