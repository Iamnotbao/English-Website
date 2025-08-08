
import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

const AuthService = {
    async login(userData: { username: string; password: string }) {
        try {
            console.log("Login response:", userData);
            const response = await axios.post(`${API}/auth/signin`, userData);    
            return response.data ? response.data : null;
        } catch (error) {
            throw error;
        }
    },
    async register(userData: { username: string; email: string; password: string }) {
        try {
            const response = await axios.post(`${API}/auth/signup`, userData);
            return response.data ? response.data : null;
        } catch (error) {
            throw error;
        }
    },
    async logout() {
        try {
            const response = await axios.get(`${API}/auth/logout`);
            return response.data ? response.data : null;
        } catch (error) {
            throw error;
        }
    },
    async refreshtoken() {
        try {
            const response = await axios.get(`${API}/auth/refresh`);
            return response.data ? response.data : null;
        } catch (error) {
            throw error;
        }
    }
};

export default AuthService;