import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            // Check for user data in localStorage on app load
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                // If user data exists, parse it and set it as the current user
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            // If parsing fails, clear the broken data
            localStorage.removeItem('user');
        }
        setLoading(false);
    }, []);

    const signup = async (userData) => {
        try {
            const response = await api.post('/api/auth/register', userData);
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            alert('Registration failed: ' + (error.response?.data?.message || 'Please try again.'));
        }
    };

    const login = async (credentials) => {
        try {
            const response = await api.post('/api/auth/login', credentials);
            const userData = response.data; // The response now contains { token, name, email, role }

            // Store the entire user object (including name) as a JSON string
            localStorage.setItem('user', JSON.stringify(userData));

            setUser(userData);
            console.log('Login successful:', userData);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed: ' + (error.response?.data?.message || 'Invalid credentials.'));
        }
    };

    const logout = () => {
        // Remove the entire user object from localStorage
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};