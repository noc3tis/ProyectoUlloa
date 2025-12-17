import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import citasService from './citasService';

const initialState = {
  citas: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const crearCita = createAsyncThunk(
  'citas/crear',
  async (citaData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await citasService.crearCita(citaData, token);
    } catch (error) {
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
      .addCase(obtenerCitas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(obtenerCitas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.citas = action.payload;
      })
      .addCase(obtenerCitas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(cancelarCita.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.citas = state.citas.filter(
            (cita) => cita._id !== action.payload.id
        );
      })
      .addCase(reprogramarCita.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reprogramarCita.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.citas = state.citas.map((cita) =>
          cita._id === action.payload._id ? action.payload : cita
        );
      })
      .addCase(reprogramarCita.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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