import axios from "axios";

const API_URL = "http://localhost:5000";

// Создаем экземпляр axios с токеном
const api = axios.create({
  baseURL: API_URL,
});

// Добавляем interceptor для всех запросов
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Авторизация (Логин)
export const login = async (email, password) => {
    try{
        const response = await api.post("/users/login", { email, password });
        console.log("Ответ сервера:", response.data); // Проверка ответа
        return { token: response.data.token, user: response.data.user }; 
    }catch (error) {
        console.error("Ошибка входа:", error.response?.data || error.message);
        throw error;
      }
  
};

// Регистрация
export const register = async (username, email, password) => {
    try {
      const response = await api.post("/users/register", { username, email, password });
      console.log("Ответ сервера:", response.data);
      return response.data;
    } catch (error) {
      console.error("Ошибка регистрации:", error.response?.data || error.message);
      throw error;
    }
  };
  

// Выход (очистка токена)
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// // Проверка OTP
// export const verifyOTP = async (email, otp) => {
//   console.log("Отправка verifyOTP с:", email, otp);
//   return api.post("/verify-otp", { email, otp });
// };

// Запрос данных с токеном
export const getGoals = async () => {
  return api.get("/goals/all?limit=10");
};
