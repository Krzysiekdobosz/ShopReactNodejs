import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('auth-token');
            if (token) {
                const userRes = await axios.get('/api/auth/user', {
                    headers: { 'x-auth-token': token }
                });
                setUser(userRes.data);
            }
            setLoading(false);
        };

        checkLoggedIn();
    }, []);

    const register = async (userData) => {
        const res = await axios.post('/api/auth/register', userData);
        localStorage.setItem('auth-token', res.data.token);
        setUser(res.data.user);
    };

    const login = async (userData) => {
        const res = await axios.post('/api/auth/login', userData);
        localStorage.setItem('auth-token', res.data.token);
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem('auth-token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
