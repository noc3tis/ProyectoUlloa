import axios from 'axios';

const API_URL = 'http://160.34.208.217:8000/api/citas/';

// --- SERVICIOS HTTP (AXIOS) ---

const crearCita = async (datosCita, token) => {
  // Configuración de Seguridad:
  // Inyectamos el Token JWT en el encabezado 'Authorization'.
  // Esto permite al middleware del backend validar nuestra identidad.
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  };

  // Petición POST: Enviamos el payload (datosCita) al servidor.
  const response = await axios.post(API_URL, datosCita, config);
  return response.data;
};

const obtenerCitas = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  
  // Petición GET: Recuperamos el historial del usuario.
  const response = await axios.get(API_URL, config);
  return response.data;
};

const cancelarCita = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Petición DELETE: Eliminación lógica o física del recurso.
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const reprogramarCita = async (citaId, nuevosDatos, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    // Petición PUT: Actualización la cita.
    const response = await axios.put(API_URL + citaId, nuevosDatos, config)
    return response.data
}

const getCitasDoctor = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Endpoint específico para el rol de Médico
  const response = await axios.get(API_URL + 'doctor', config);
  return response.data;
};

const citasService = {
  crearCita,
  obtenerCitas, 
  cancelarCita, 
  reprogramarCita,
  getCitasDoctor
};

export default citasService;