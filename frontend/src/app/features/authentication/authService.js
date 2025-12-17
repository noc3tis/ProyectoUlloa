import axios from 'axios';

// Definición del Endpoint base para la autenticación
const API_URL = 'http://160.34.208.217:8000/api/usuarios/';

// Servicio de Registro
const register = async (userData) => {
    console.log("Intentando conectar a:", API_URL);
    
    // Comunicación Cliente-Servidor (Axios):
    // Enviamos los datos del formulario al Backend (Node.js)
    const respuesta = await axios.post(API_URL, userData);

    // PERSISTENCIA DE SESIÓN:
    // Si el servidor responde con éxito, guardamos el objeto usuario (que incluye el Token JWT)
    // en el LocalStorage del navegador. Esto mantiene la sesión viva aunque se recargue la página.
    if (respuesta.data) {
        localStorage.setItem('user', JSON.stringify(respuesta.data));
    }
    return respuesta.data;
};

// Servicio de Login
const login = async (userData) => {
    const respuesta = await axios.post(API_URL + 'login', userData);
    
    // Al igual que en registro, persistimos la sesión al recibir el Token.
    if (respuesta.data) {
        localStorage.setItem('user', JSON.stringify(respuesta.data));
    }
    return respuesta.data;
}

// Servicio de Logout
// Simplemente eliminamos el token del almacenamiento local.
const logout = () => localStorage.removeItem('user');

const authService = { register, logout, login };

export default authService;