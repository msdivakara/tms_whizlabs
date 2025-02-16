import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            const users = response.data;

            const existingUser = users.find(user => user.email === email && user.password === password);

            if (existingUser) {
                localStorage.setItem("user", JSON.stringify(existingUser));
                setUser(existingUser);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error("Login failed:", err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
