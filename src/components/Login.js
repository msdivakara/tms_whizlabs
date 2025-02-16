import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [showRegister, setShowRegister] = useState(false);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        console.log("Login Attempt:", email, password);

        try {
            const loginSuccess = await login(email, password);
            if (loginSuccess) {
                navigate("/dashboard");
            } else {
                setError("Invalid email or password.");
                setPassword("");
            }
        } catch (err) {
            console.error("Error logging in:", err);
            setError("Server error. Please try again.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !mobile.trim() || !password.trim()) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await axios.get("http://localhost:5000/users");
            const users = response.data;

            if (users.some(user => user.email === email)) {
                setError("This email is already registered. Please log in.");
                return;
            }

            const newUser = { name, mobile, email, password };
            await axios.post("http://localhost:5000/users", newUser);

            setShowRegister(false);
            setError("");
            alert("Account created successfully! Please log in.");

            setName("");
            setEmail("");
            setMobile("");
            setPassword("");
        } catch (err) {
            console.error("Error registering user:", err);
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="vh-100 bg-light">
        <h1 className="text-center text-primary fw-bold mt-5 mb-3">
            Task Management System
        </h1>
    
        <div className="d-flex justify-content-center align-items-start">
            <div className="card p-4 shadow-lg mt-3" 
                 style={{ width: "400px", borderRadius: "10px" }}>
                    <h2 className="text-center text-primary">
                        {showRegister ? "Create Account" : "Login"}
                    </h2>

                    {error && <p className="text-danger text-center">{error}</p>}

                    {!showRegister ? (
                        <form onSubmit={handleLogin} noValidate>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Login</button>

                            <p className="text-center mt-3">
                                Don't have an account?
                                <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowRegister(true)}
                                >
                                    {" "}Create one
                                </span>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleRegister} noValidate>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Mobile Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    placeholder="Enter your mobile number"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-success w-100">Create Account</button>

                            <p className="text-center mt-3">
                                Already have an account?
                                <span
                                    className="text-primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShowRegister(false)}
                                >
                                    {" "}Log in
                                </span>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
