import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Navbar.css"; // Make sure this file is correctly linked

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Main Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">Task Manager</Link>
                    
                    {/* Hamburger button (visible only on mobile) */}
                    <button 
                        className="navbar-toggler d-block d-lg-none" 
                        type="button" 
                        onClick={toggleSidebar}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Normal Navbar for Desktop */}
                    <div className="collapse navbar-collapse d-none d-lg-block">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/tasks">Manage Tasks</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Sidebar for Mobile View */}
            <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <button className="close-btn" onClick={toggleSidebar}>&times;</button>
                <ul>
                    <li><Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
                    <li><Link to="/tasks" onClick={toggleSidebar}>Manage Tasks</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
