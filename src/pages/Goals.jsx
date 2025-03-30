import React, { useEffect, useState } from "react";
import { createGoal, getAllGoals, deleteGoal } from "../services/goalsService";

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState({ title: "", description: "" });

    // Загрузка целей при монтировании компонента
    useEffect(() => {
        getAllGoals().then((response) => setGoals(response.data)).catch((error) => console.error(error));
    }, []);

    // Обработчик создания новой цели
    const handleCreateGoal = async () => {
        try {
            const response = await createGoal(newGoal);
            setGoals([...goals, response.data]); // Обновляем список целей
            setNewGoal({ title: "", description: "" }); // Очищаем форму
        } catch (error) {
            console.error("Ошибка при создании цели", error);
        }
    };

    // Обработчик удаления цели
    const handleDeleteGoal = async (goalId) => {
        try {
            await deleteGoal(goalId);
            setGoals(goals.filter(goal => goal.id !== goalId)); // Убираем удалённую цель из списка
        } catch (error) {
            console.error("Ошибка при удалении цели", error);
        }
    };

    return (
        <div>
            <h1>Цели</h1>
            <input
                type="text"
                placeholder="Название"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            />
            <textarea
                placeholder="Описание"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
            />
            <button onClick={handleCreateGoal}>Создать цель</button>

            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>
                        {goal.title} - {goal.description}
                        <button onClick={() => handleDeleteGoal(goal.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Goals;
