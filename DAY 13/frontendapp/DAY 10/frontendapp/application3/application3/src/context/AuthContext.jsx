import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for token on load
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setUser(JSON.parse(userData));
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await api.post('/auth/login', { email, password });

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                }));

                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                setUser({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                });
                return { success: true, role: data.role };
            }
        } catch (error) {
            return { success: false, message: error.message || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const { data } = await api.post('/auth/register', userData);

            if (data.success) {
                // Auto login after register
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                }));

                api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                setUser({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                });
                return { success: true };
            }
        } catch (error) {
            return { success: false, message: error.message || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
