import axios from 'axios';
const API_URL = 'http://160.34.208.217:8000/api/usuarios/';

const register = async (userData) => {
    console.log("Intentando conectar a:", API_URL);
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