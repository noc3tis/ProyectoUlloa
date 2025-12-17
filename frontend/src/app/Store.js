import { configureStore } from '@reduxjs/toolkit';
// Importamos los Reducers de cada funcionalidad (Feature Slices)
import authReducer from './features/authentication/authSlice';
import medicoReducer from './features/medicos/medicoSlice'; 
import citasReducer from './features/citas/citasSlice';

// Configuración del Store Global:
// configureStore es una abstracción de Redux Toolkit que configura automáticamente
// las DevTools del navegador y el middleware (como Redux Thunk) para manejo asíncrono.
export const store = configureStore({
  reducer: {
    // Definimos las "ramas" de nuestro árbol de estado:
    auth: authReducer,      // Maneja usuario y token
    medicos: medicoReducer, // Maneja el catálogo y perfiles
    citas: citasReducer,    // Maneja la lógica de reservaciones
    },
});

export default store;