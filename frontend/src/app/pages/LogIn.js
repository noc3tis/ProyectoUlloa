import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/authentication/authSlice'; // Importamos la acción login
import Spinner from '../components/Spinner'; // Asegúrate de tener este componente

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 1. Traemos los datos del estado global
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    // 2. useEffect: Vigila si el login fue exitoso
    useEffect(() => {
        if (isError) {
            toast.error(message); // Muestra error si falla (ej: "Contraseña incorrecta")
        }

        if (isSuccess || user) {
            navigate('/'); // Si todo sale bien, mándalo al Dashboard
        }

        dispatch(reset()); // Limpia el estado
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        };

        // 3. Disparamos la acción de Login de Redux
        dispatch(login(userData));
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='heading'>
                <h1>Login</h1>
                <p>Inicie sesión</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        {/* Input del Email */}
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}            // <--- VINCULADO AL ESTADO
                            onChange={onChange}      // <--- DETECTA CAMBIOS
                            placeholder='Introduzca su email'
                        />
                    </div>

                    <div className='form-group'>
                        {/* Input del Password */}
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}         // <--- VINCULADO AL ESTADO
                            onChange={onChange}      // <--- DETECTA CAMBIOS
                            placeholder='Introduzca su contraseña'
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Entrar</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;