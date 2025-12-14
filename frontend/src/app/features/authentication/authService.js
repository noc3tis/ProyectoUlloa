import axios from 'axios';
const API_URL = 'http://localhost:5000/api/usuarios/';

const register = async (userData) => {
    const respuesta = await axios.post(API_URL, userData);
    if (respuesta.data) {
        localStorage.setItem('user', JSON.stringify(respuesta.data));
    }
    return respuesta.data;
};

const login = async (userData) => {
    const respuesta = await axios.post(API_URL + 'login', userData);
    if (respuesta.data) {
        localStorage.setItem('user', JSON.stringify(respuesta.data));
    }
    return respuesta.data;
}

const logout = () => localStorage.removeItem('user');

const authService = { register, logout, login };

export default authService;