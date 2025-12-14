import axios from 'axios';

const API_URL = 'http://localhost:5000/api/citas/';

// Crear nueva cita
const crearCita = async (datosCita, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Necesitamos el token para saber quién es el paciente
    },
  };

  const response = await axios.post(API_URL, datosCita, config);
  return response.data;
};

const obtenerCitas = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Cancelar cita
const cancelarCita = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  // Nota la ruta: /api/citas/cancelar/ID
  const response = await axios.put(API_URL + 'cancelar/' + id, {}, config);
  return response.data;
};

const citasService = {
  crearCita,
  obtenerCitas, // <--- Agregar
  cancelarCita, // <--- Agregar
};

export default citasService;