import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/authentication/authSlice'; 
import Spinner from '../components/Spinner'; 

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message); 
        }

        if (isSuccess || user) {
      if (user && user.rol === 'medico') {
        navigate('/doctor-dashboard')
      } else {
        navigate('/')
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
        e.preventDefault();

        const userData = {
            email,
            password,
        };
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
                        <button type='submit' className='btn btn-block'>Entrar</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;