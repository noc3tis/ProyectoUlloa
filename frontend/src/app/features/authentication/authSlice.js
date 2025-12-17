import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const usuariolocal = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: usuariolocal ? usuariolocal : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

export const registro = createAsyncThunk(
    'auth/registro',
    async (user, thunkAPI) => {
        console.log("1. Entrando al Thunk de registro"); // <--- DEBUG
        try {
            console.log("2. Llamando a authService con datos:", user); // <--- CORREGIDO
            
            return await authService.register(user);
        } catch (error) {
            console.log("4. ERROR detectado en el Thunk:", error);     // <--- DEBUG
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: builder => {
        builder 
            .addCase(registro.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registro.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(registro.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
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