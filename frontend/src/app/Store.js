import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authentication/authSlice';
import medicoReducer from './features/medicos/medicoSlice'; 
import citasReducer from './features/citas/citasSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicos: medicoReducer, 
    citas: citasReducer,
    },
});
export default store;