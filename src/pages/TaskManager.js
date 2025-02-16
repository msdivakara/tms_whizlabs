import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

const TaskManager = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3 className="text-primary text-center">Task Management</h3>
                
                {/* ✅ Responsive Layout: Left (Form) | Right (List) */}
                <div className="row">
                    <div className="col-md-6">
                        <TaskForm />
                    </div>
                    <div className="col-md-6">
                        <TaskList />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskManager;
