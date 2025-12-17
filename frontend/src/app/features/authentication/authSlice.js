import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Inicialización del Estado (State Initialization):
// Intentamos leer del localStorage al arrancar la app.
// Si existe un usuario guardado, iniciamos con él (Sesión persistente).
const usuariolocal = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: usuariolocal ? usuariolocal : null,
    isError: false,
    isSuccess: false,
    isLoading: false, // Controla el Spinner
    message: ''
};

// --- ASYNC THUNKS (Manejo de Asincronía en Redux) ---
// Estas funciones intermedias manejan el ciclo de vida de la petición a la API.

export const registro = createAsyncThunk(
    'auth/registro',
    async (user, thunkAPI) => {
        try {
            // Delegamos la petición HTTP al servicio
            return await authService.register(user);
        } catch (error) {
            // MANEJO DE ERRORES CENTRALIZADO:
            // Si el backend falla (ej. "Usuario ya existe"), capturamos el mensaje
            // y lo enviamos al estado global como 'rejected'.
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try{
        return await authService.login(user);
    }catch (error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async () => authService.logout());

// --- SLICE (Reducers y Lógica de Estado) ---
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer síncrono para limpiar mensajes de error/éxito al cambiar de pantalla
        reset: state => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    // EXTRA REDUCERS: Aquí escuchamos a los Thunks asíncronos
    extraReducers: builder => {
        builder 
            // 1. PENDING: La petición está viajando. Activamos Spinner.
            .addCase(registro.pending, (state) => {
                state.isLoading = true
            })
            // 2. FULFILLED: La petición fue exitosa. Guardamos usuario y quitamos Spinner.
            .addCase(registro.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload; // Payload = Datos que devolvió el backend
            })
            // 3. REJECTED: Hubo un error. Guardamos el mensaje para mostrarlo en alerta.
            .addCase(registro.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; // Payload = El mensaje de error capturado arriba
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true; 
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;