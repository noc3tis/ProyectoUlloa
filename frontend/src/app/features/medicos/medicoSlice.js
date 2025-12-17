import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import medicoService from './medicoService';

const initialState = {
  medicos: [],        // Catálogo público
  perfil: null,       // Perfil privado (Si soy médico)
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getMedicos = createAsyncThunk(
  'medicos/getAll',
  async (_, thunkAPI) => {
    try {
      return await medicoService.getMedicos();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const crearPerfilMedico = createAsyncThunk(
  'medicos/crear',
  async (medicoData, thunkAPI) => {
    try {
      // Verificación de integridad: Aseguramos que existe un usuario antes de pedir el token.
      const authState = thunkAPI.getState().auth;
      if (!authState || !authState.user) {
         return thunkAPI.rejectWithValue("No hay usuario logueado");
      }
      const token = authState.user.token; 
      return await medicoService.crearPerfil(medicoData, token);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const obtenerPerfilMedico = createAsyncThunk(
    'medicos/obtenerPerfil',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await medicoService.obtenerPerfil(token); 
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const medicoSlice = createSlice({
  name: 'medico',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Manejo del Catálogo Público
      .addCase(getMedicos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMedicos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.medicos = action.payload; 
      })
      .addCase(getMedicos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Manejo de Creación de Perfil
      .addCase(crearPerfilMedico.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(crearPerfilMedico.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.perfil = action.payload; 
      })
      .addCase(crearPerfilMedico.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Manejo de Lectura de Perfil Propio
      .addCase(obtenerPerfilMedico.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(obtenerPerfilMedico.fulfilled, (state, action) => {
        state.isLoading = false;
        state.perfil = action.payload; 
      })
      .addCase(obtenerPerfilMedico.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = medicoSlice.actions;
export default medicoSlice.reducer;