import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { tasks } = useContext(TaskContext);
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ Filter tasks based on search input
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-3 mt-md-0"> 
            {/* ✅ Search Input */}
            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search tasks by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* ✅ Display Filtered Tasks */}
            {filteredTasks.length === 0 ? (
                <div className="card text-center p-3 bg-light">
                    <h5 className="text-muted">No matching tasks found</h5>
                </div>
            ) : (
                <ul className="list-group">
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
