import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import "../TaskForm.css";

const TaskForm = () => {
    const { addTask } = useContext(TaskContext);
    const [task, setTask] = useState({ id: "", name: "", description: "", status: "Pending" });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.name) return;
        addTask({ ...task, id: Date.now() }); // ✅ Assigning a unique ID
        setTask({ id: "", name: "", description: "", status: "Pending" });
    };

    return (
        <form onSubmit={handleSubmit} className="p-3 bg-light rounded shadow">
            <h5 className="text-center mb-3">Add New Task</h5>

            <div className="mb-3">
                <input type="text" name="name" className="form-control" placeholder="Task Name" value={task.name} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <textarea name="description" className="form-control" placeholder="Task Description" value={task.description} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <select name="status" className="form-select" value={task.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <button type="submit" className="btn btn-success w-100">Add Task</button>
        </form>
    );
};

export default TaskForm;
