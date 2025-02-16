import React, { useState, useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import "../Task.css"; // Ensure you add styles here

const TaskItem = ({ task }) => {
    const { updateTask, deleteTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.name);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedStatus, setEditedStatus] = useState(task.status);
    const [showDetails, setShowDetails] = useState(false);

    // 🔄 Click only on the empty space, not inside inputs
    const handleBoxClick = (e) => {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT" || e.target.tagName === "BUTTON") {
            return;
        }
        setShowDetails(!showDetails);
        setIsEditing(false); // Exit edit mode when clicking outside
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setShowDetails(true); // Expand when editing
    };

    const handleSaveClick = () => {
        if (!editedTitle.trim() || !editedDescription.trim() || !editedStatus.trim()) return;

        updateTask(task.id, { 
            name: editedTitle,
            description: editedDescription, 
            status: editedStatus 
        });

        setIsEditing(false);
    };

    return (
        <div 
            className="card shadow-sm mb-3 task-container" 
            onClick={handleBoxClick} // 🖱 Click anywhere except inputs
        >
            <div className="card-body position-relative">
                <div className="d-flex justify-content-between align-items-center">
                    {isEditing ? (
                        <input 
                            type="text" 
                            className="form-control form-control-sm me-2"
                            value={editedTitle} 
                            onChange={(e) => setEditedTitle(e.target.value)} 
                        />
                    ) : (
                        <h5 className="text-primary mb-0">{task.name}</h5>
                    )}

                    <div className="d-flex align-items-center">
                        <span className={`badge me-2 ${task.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                            {task.status}
                        </span>

                        {/* ⬇️ Smooth Dropdown Toggle */}
                        <span 
                            className={`cursor-pointer transition-transform ${showDetails ? "rotate-180" : ""}`} 
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDetails(!showDetails);
                            }}
                        >
                            ▼
                        </span>
                    </div>
                </div>

                {/* 🔽 Task Details with Smooth Expand & Collapse */}
                <div className={`task-details ${showDetails ? "show" : ""}`}>
                    {isEditing ? (
                        <>
                            <textarea 
                                className="form-control mb-2" 
                                value={editedDescription} 
                                onChange={(e) => setEditedDescription(e.target.value)} 
                            />
                            <select 
                                className="form-control mb-2" 
                                value={editedStatus} 
                                onChange={(e) => setEditedStatus(e.target.value)}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <div className="d-flex justify-content-between">
                                <button className="btn btn-success btn-sm" onClick={handleSaveClick}>Save</button>
                                <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="mb-1">{task.description}</p>

                            <div className="btn-group w-100 mt-2">
                                <button className="btn btn-light text-primary btn-sm" onClick={handleEditClick}>Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
