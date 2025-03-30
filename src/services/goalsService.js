import axios from "axios";

const API_URL = "http://localhost:5000/goals"; // Базовый URL для целей

//  Создание новой цели
export const createGoal = async (goalData) => {
    return axios.post(API_URL, goalData);
};

//  Получение всех целей (с лимитом)
export const getAllGoals = async (limit = 10) => {
    return axios.get(`${API_URL}/all?limit=${limit}`);
};

//  Получение цели по ID
export const getGoalById = async (goalId) => {
    return axios.get(`${API_URL}/${goalId}`);
};

//  Обновление цели
export const updateGoal = async (goalId, updatedData) => {
    return axios.put(`${API_URL}/${goalId}`, updatedData);
};

//  Удаление цели
export const deleteGoal = async (goalId) => {
    return axios.delete(`${API_URL}/${goalId}`);
};

// 📌 Получение целей пользователя (с фильтрацией по категории)
export const getUserGoals = async (userId, category = "") => {
    const url = category ? `${API_URL}/user/${userId}?category=${category}` : `${API_URL}/user/${userId}`;
    return axios.get(url);
};
