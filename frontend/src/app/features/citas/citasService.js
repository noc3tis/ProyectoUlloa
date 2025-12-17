import axios from 'axios';

const API_URL = 'http://160.34.208.217:8000/api/citas/';

const crearCita = async (datosCita, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, 
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

const cancelarCita = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + id, config);

  return response.data;
};
const reprogramarCita = async (citaId, nuevosDatos, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(API_URL + citaId, nuevosDatos, config)
    return response.data
}

const getCitasDoctor = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
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