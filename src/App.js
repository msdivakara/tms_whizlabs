import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import TaskProvider from "./context/TaskContext";
import Dashboard from "./pages/Dashboard";
import TaskManager from "./pages/TaskManager";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";

const App = () => {
    return (
        <AuthProvider> {/* ✅ Wrap in AuthProvider */}
            <TaskProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                        <Route path="/tasks" element={<PrivateRoute><TaskManager /></PrivateRoute>} />
                    </Routes>
                </Router>
            </TaskProvider>
        </AuthProvider>
    );
};

export default App;
