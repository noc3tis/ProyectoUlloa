import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import medicoService from './medicoService';

const initialState = {
  medicos: [],        // Aquí se guardará la lista de doctores
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Obtener médicos (Acción asíncrona)
export const getMedicos = createAsyncThunk(
  'medicos/getAll',
  async (_, thunkAPI) => {
    try {
      return await medicoService.getMedicos();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const medicoSlice = createSlice({
  name: 'medico',
  initialState,
  reducers: {
    reset: (state) => initialState, // Para limpiar el estado si es necesario
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMedicos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMedicos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.medicos = action.payload; // ¡Aquí guardamos los datos que vienen de la BD!
      })
      .addCase(getMedicos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = medicoSlice.actions;
export default medicoSlice.reducer;