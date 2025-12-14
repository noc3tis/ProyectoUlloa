import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import citasService from './citasService';

const initialState = {
  citas: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Acción para crear cita
export const crearCita = createAsyncThunk(
  'citas/crear',
  async (datosCita, thunkAPI) => {
    try {
      // Obtenemos el token del estado de Auth
      const token = thunkAPI.getState().auth.user.token;
      return await citasService.crearCita(datosCita, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const obtenerCitas = createAsyncThunk('citas/obtener', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await citasService.obtenerCitas(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// 2. Acción: CANCELAR CITA
export const cancelarCita = createAsyncThunk('citas/cancelar', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await citasService.cancelarCita(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const citasSlice = createSlice({
  name: 'citas',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(crearCita.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(crearCita.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.citas.push(action.payload);
      })
      .addCase(crearCita.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(obtenerCitas.pending, (state) => { state.isLoading = true })
      .addCase(obtenerCitas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.citas = action.payload; // Llenamos la lista
      })
      .addCase(obtenerCitas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
            // --- CASOS CANCELAR CITA ---
      .addCase(cancelarCita.fulfilled, (state, action) => {
        state.isLoading = false;
        // Truco Pro: Buscamos la cita en la lista local y le cambiamos el estado a 'cancelada'
        // para no tener que recargar toda la página.
        state.citas = state.citas.map((cita) => 
        cita._id === action.payload._id ? action.payload : cita
        );
      });
  },
});

export const { reset } = citasSlice.actions;
export default citasSlice.reducer;