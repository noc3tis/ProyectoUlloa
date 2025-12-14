import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// Asegúrate de que la ruta sea correcta (authSlice) y la acción se llame 'registrar' o 'registro' según tu slice
import { registro, reset } from '../features/authentication/authSlice'; 
import Spinner from '../components/Spinner'; // Asumiendo que tienes este componente

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        password2: ''
    });

    const { nombre, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 1. Traemos el estado de Redux para saber qué pasó con la petición
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    // 2. useEffect: Vigila el estado. Si hay éxito, redirige. Si hay error, avisa.
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/'); // Redirigir al Dashboard
        }

        dispatch(reset()); // Limpiar el estado al terminar
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Las contraseñas no coinciden');
        } else {
            const userData = {
                nombre,
                email,
                password,
            };
            // 3. En lugar de axios, DISPARAMOS la acción de Redux
            dispatch(registro(userData));
        }
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className='heading'>
                <h1>Registro</h1>
                <p>Por favor cree una cuenta</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    {/* 1. Nombre Completo */}
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='nombre'
                            name='nombre'
                            value={nombre}           // <--- FALTABA ESTO
                            onChange={onChange}      // <--- FALTABA ESTO
                            placeholder='Introduzca su nombre completo'
                        />
                    </div>

                    {/* 2. Email */}
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}            // <--- FALTABA ESTO
                            onChange={onChange}      // <--- FALTABA ESTO
                            placeholder='Introduzca su email'
                        />
                    </div>

                    {/* 3. Contraseña */}
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}         // <--- FALTABA ESTO
                            onChange={onChange}      // <--- FALTABA ESTO
                            placeholder='Introduzca su contraseña'
                        />
                    </div>

                    {/* 4. Confirmar Contraseña */}
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}        // <--- FALTABA ESTO
                            onChange={onChange}      // <--- FALTABA ESTO
                            placeholder='Confirmar contraseña'
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Enviar</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Registro;