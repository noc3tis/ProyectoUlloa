import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import citasService from './citasService';

const initialState = {
  citas: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- ASYNC THUNKS  ---

export const crearCita = createAsyncThunk(
  'citas/crear',
  async (citaData, thunkAPI) => {
    try {
      // INTERACCIÓN ENTRE SLICES:
      // Usamos thunkAPI.getState() para acceder al estado de 'auth' y obtener el token.
      const token = thunkAPI.getState().auth.user.token;
      return await citasService.crearCita(citaData, token);
    } catch (error) {
      // Manejo estandarizado de errores HTTP
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const obtenerCitas = createAsyncThunk(
  'citas/obtener',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await citasService.obtenerCitas(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cancelarCita = createAsyncThunk(
  'citas/cancelar',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await citasService.cancelarCita(id, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reprogramarCita = createAsyncThunk(
  'citas/reprogramar',
  async ({ id, datos }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await citasService.reprogramarCita(id, datos, token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const obtenerCitasDoctor = createAsyncThunk(
  'citas/obtenerDoctor',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await citasService.getCitasDoctor(token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- REDUCERS (Lógica de Actualización de Estado) ---

export const citasSlice = createSlice({
  name: 'citas',
  initialState,
  reducers: {
    // Reset síncrono para limpiar estados de carga/error
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // 1. FLUJO DE CREACIÓN
      .addCase(crearCita.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(crearCita.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Inmutabilidad: Redux Toolkit usa Immer por debajo, permitiéndonos hacer push
        // de manera segura. Añadimos la nueva cita al array local.
        state.citas.push(action.payload);
      })
      .addCase(crearCita.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // 2. FLUJO DE LECTURA (GET)
      .addCase(obtenerCitas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(obtenerCitas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.citas = action.payload; // Reemplazamos el array con los datos del servidor
      })
      .addCase(obtenerCitas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 3. FLUJO DE ELIMINACIÓN
      .addCase(cancelarCita.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Actualización:
        // Filtramos la cita eliminada del estado local para que desaparezca 
        // de la pantalla instantáneamente sin tener que volver a pedir todas las citas.
        state.citas = state.citas.filter(
            (cita) => cita._id !== action.payload.id
        );
      })

      // 4. FLUJO DE ACTUALIZACIÓN (PUT)
      .addCase(reprogramarCita.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reprogramarCita.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Actualización Local:
        // Mapeamos el array y reemplazamos solo el objeto que cambió.
        // Esto mantiene la UI sincronizada eficientemente.
        state.citas = state.citas.map((cita) =>
          cita._id === action.payload._id ? action.payload : cita
        );
      })
      .addCase(reprogramarCita.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 5. FLUJO ESPECÍFICO DE MÉDICO
      .addCase(obtenerCitasDoctor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(obtenerCitasDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.citas = action.payload;
      })
      .addCase(obtenerCitasDoctor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = citasSlice.actions;
export default citasSlice.reducer;