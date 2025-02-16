import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(user.profileImage || "https://www.w3schools.com/howto/img_avatar.png");
    const [hover, setHover] = useState(false);

    if (!user) {
        return <p className="text-danger text-center">Unauthorized Access. Please log in.</p>;
    }

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleProfileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-10">
                        <div 
                            className="card shadow-lg p-4 mx-auto text-center"
                            style={{ borderRadius: "15px", maxWidth: "450px" }} // 👈 Reduced width
                        >
                            {/* Profile & Welcome Row */}
                            <div className="d-flex align-items-center justify-content-center gap-3">
                                {/* Profile Image Container */}
                                <div 
                                    className="position-relative"
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                    style={{ cursor: "pointer", width: "75px", height: "75px" }} // 👈 Slightly smaller
                                >
                                    <img 
                                        src={profileImage} 
                                        alt="User Avatar" 
                                        className="rounded-circle border border-2"
                                        width="75"
                                        height="75"
                                        style={{ objectFit: "cover" }}
                                    />
                                    
                                    {/* Camera Icon (Appears on Hover) */}
                                    {hover && (
                                        <label 
                                            className="position-absolute d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded-circle"
                                            style={{
                                                top: "0",
                                                left: "0",
                                                width: "75px",
                                                height: "75px",
                                                cursor: "pointer"
                                            }}
                                        >
                                            <i className="bi bi-camera-fill text-white fs-6"></i>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                className="d-none"
                                                onChange={handleProfileUpload}
                                            />
                                        </label>
                                    )}
                                </div>

                                {/* Welcome Text */}
                                <div>
                                    <h4 className="text-success fw-bold mb-0">Welcome, {user.name}!</h4>
                                    <p className="text-muted mb-0">Your profile details</p>
                                </div>
                            </div>

                            <hr />

                            {/* Profile Details */}
                            <div className="text-start px-3">
                                <p className="mb-2">
                                    <i className="bi bi-envelope text-primary"></i> 
                                    <strong>Email:</strong> {user.email}
                                </p>
                                <p className="mb-2">
                                    <i className="bi bi-phone text-success"></i> 
                                    <strong>Mobile:</strong> {user.mobile}
                                </p>
                            </div>

                            <button onClick={handleLogout} className="btn btn-danger w-100 mt-3">
                                <i className="bi bi-box-arrow-right"></i> Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Task List (Only Task Names) */}
                <div className="mt-4">
                    <h4 className="text-center text-primary fw-bold">Your Tasks</h4>
                    <TaskList showDetails={false} />
                </div>

                {/* Task Manager Navigation */}
                <div className="text-center mt-3">
                    <Link to="/tasks" className="btn btn-outline-primary">Go to Task Manager</Link>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
