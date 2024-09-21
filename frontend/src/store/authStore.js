import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';
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
            set({ error: error.response.message || "Error Signup", isLoading: false });
            throw error
        }
    }
}))