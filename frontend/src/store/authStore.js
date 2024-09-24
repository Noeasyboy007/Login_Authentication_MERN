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
    isVerified: false,
    message: null,

    // Signup Function
    signup: async (email, password, name) => {
        set({ isLoading: true, error: null, });

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
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, isVerified: true });
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
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false, isVerified: true });
        } catch (error) {
            // Check if the error is a 401 Unauthorized
            if (error.response?.status === 401) {
                set({ error: "Unauthorized access. Please log in.", isAuthenticated: false, isCheckingAuth: false, user: null });
            } else {
                set({ error: error.message || "Failed to check authentication.", isAuthenticated: false, isCheckingAuth: false });
            }
        }
    },

    // Login Function
    login: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false, error: null, isVerified: true });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error is Loging", isLoading: false });
            throw error;
        }
    },

    // For logout Function
    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },

    // For forgot-password Function
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message || "Check your email for reset link", isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error in forgot password", isLoading: false });
            throw error;
        }
    },

    // Reset-Password Function
    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null, message: null });
        try {
            const response = await axios.post(`${API_URL}/resetPassword/${token}`, { password });
            set({ message: response.data.message || "Password reset successful", isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: error.response.data.message || "Error in reset password" });
            throw error;
        }

    }
}));