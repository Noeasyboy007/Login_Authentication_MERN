import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';
axios.defaults.withCredentials = true;

// Auth Store Hook for Zustand
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    // Signup Function
    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.message || "Error in Signup", isLoading: false });
            throw error
        }
    },

    // email-verification function
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response.message || "Invaild or expired verification code", isLoading: false });
            throw error
        }
    },

    // Check-Auth Function
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`)
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });

        } catch (error) {
            set({ error: error.message || null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    // Login Function
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error is Loging", isLoading: false });
            throw error;
        }
    }

}));