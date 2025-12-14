import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authentication/authSlice';
import medicoReducer from './features/medicos/medicoSlice'; // <--- Lo crearemos en el paso 3
import citasReducer from './features/citas/citasSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicos: medicoReducer, // <--- Aquí guardaremos a los doctores
    citas: citasReducer,
    },
});

// Al final de tu archivo Store.js agrega:
export default store;