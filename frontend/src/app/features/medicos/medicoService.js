import axios from 'axios';

const API_URL = 'http://160.34.208.217:8000/api/medicos/'; 

const getMedicos = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  console.log("🔥 VERSIÓN ACTUALIZADA - IP 160.34... PUERTO 8000 🔥"); 

  const response = await axios.get(API_URL, config);
  return response.data;
};

const crearPerfil = async (medicoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, medicoData, config);
  return response.data;
};

const obtenerPerfil = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'perfil', config) 

  return response.data
}

const medicoService = {
  getMedicos,
  crearPerfil,
  obtenerPerfil
};

export default medicoService;