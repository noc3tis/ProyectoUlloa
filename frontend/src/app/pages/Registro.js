import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registro, reset } from '../features/authentication/authSlice'; 
import Spinner from '../components/Spinner'; 
import { FaUserPlus, FaUserMd } from 'react-icons/fa';

const Registro = () => {
    // Estado local para checkbox de rol y campos de texto
    const [esMedicoCheck, setEsMedicoCheck] = useState(false)
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        password2: ''
    });

    const { nombre, email, password, password2 } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) toast.error(message);
        
        // Si el registro es exitoso, dirigimos al usuario a su dashboard correspondiente
        // inmediatamente, mejorando la UX al no pedir login de nuevo.
        if (isSuccess || user) {
            if (user && user.rol === 'medico') {
                navigate('/doctor-dashboard');
            } else {
                navigate('/');
            }
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault()
        // Validación en Cliente:
        // Ahorramos una petición al servidor verificando que las contraseñas coincidan aquí.
        if (password !== password2) {
            toast.error('Las contraseñas no coinciden')
        } else {
            const datosUsuario = {
                nombre,
                email,
                password,
                // LÓGICA DE ROL:
                // Convertimos el booleano del checkbox en el string que espera el Backend ('medico'/'paciente')
                rol: esMedicoCheck ? 'medico' : 'paciente' 
            }
            dispatch(registro(datosUsuario))
        }
    }

    if (isLoading) return <Spinner />;

    return (
        <>
            <section className='heading'>
                <h1><FaUserPlus /> Registro</h1>
                <p>Por favor cree una cuenta</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    {/* ... Campos estándar de registro ... */}
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            id='nombre'
                            name='nombre'
                            value={nombre}
                            onChange={onChange}
                            placeholder='Introduzca su nombre completo'
                        />
                    </div>
                    
                    {/* ... Email y Passwords ... */}
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Introduzca su email'
                        />
                    </div>
                    {/* ... */}
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Introduzca su contraseña'
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password2'
                            name='password2'
                            value={password2}
                            onChange={onChange}
                            placeholder='Confirmar contraseña'
                        />
                    </div>

                    {/* SELECCIÓN DE ROL */}
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                            <input 
                                type="checkbox"
                                checked={esMedicoCheck}
                                onChange={(e) => setEsMedicoCheck(e.target.checked)}
                                style={{ width: '20px', height: '20px' }}
                            />
                            <span>Soy Médico / Especialista</span> <FaUserMd size={20} color="#007bff"/>
                        </label>
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