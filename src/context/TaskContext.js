import React, { createContext, useState } from "react";

export const TaskContext = createContext(); 

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
  
    ]);

    // ✅ Add Task (Use Unique ID)
    const addTask = (task) => {
        setTasks([...tasks, { id: Date.now(), ...task }]);
    };

    // ✅ Update Task
    const updateTask = (taskId, updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task => 
                task.id === taskId ? { ...task, ...updatedTask } : task
            )
        );
    };

    // ✅ Delete Task
    const deleteTask = (taskId) => {
        console.log("Deleting Task ID:", taskId);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
