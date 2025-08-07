
import axios from 'axios';

const API =  process.env.API_URL || "http://localhost:5000/api";

const AuthService = {
    async login(userData: { email: string; password: string }) {
        try {
            const response = await axios.post(`${API}/auth/login`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async register(userData: { name: string; email: string; password: string }) {
        try {
            const response = await axios.post(`${API}/auth/register`, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
export default AuthService;