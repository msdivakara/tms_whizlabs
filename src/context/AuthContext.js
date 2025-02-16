import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// Mocked User Data
const MOCKED_USER = {
    id: 1,
    email: "whiz@labs.com",
    password: "whizlabs"
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password) => {
        if (email === MOCKED_USER.email && password === MOCKED_USER.password) {
            localStorage.setItem("user", JSON.stringify(MOCKED_USER));
            setUser(MOCKED_USER);
            return true;
        }
        return false;
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
