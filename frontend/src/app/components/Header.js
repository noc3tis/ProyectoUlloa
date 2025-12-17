import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Importamos los hooks para conectar el componente con el Estado Global
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authentication/authSlice';
import { FaHospitalUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUserMd } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // SELECCIÓN DE ESTADO (State Selection):
    // Extraemos al usuario del store. Si 'user' tiene datos, estamos logueados.
    // Si es null, somos un visitante anónimo.
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        // 1. Disparamos la acción asíncrona para limpiar el localStorage
        dispatch(logout());
        
        // 2. Reseteamos el estado visual (errores, mensajes de éxito previos)
        dispatch(reset());
        
        // 3. Redirigimos al usuario a la pantalla de entrada
        navigate('/login');
    };

    return (
        <header className="header">
            <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit'}}>
                <FaHospitalUser size={24} /> <span>DocApp</span>
            </Link>

            <ul>
                {/* RENDERIZADO CONDICIONAL: */}
                {/* Usamos un ternario para decidir qué botones mostrar. */}
                {user ? (
                    // CASO A: Usuario Autenticado
                    <>
                        <li style={{marginRight: '15px', fontWeight: 'bold'}}>
                            Hola, {user.nombre}
                        </li>

                        {/* Validación de Roles en Frontend:
                            Solo mostramos el botón de perfil si el rol es 'medico'. */}
                        {user.rol === 'medico' && (
                            <li>
                                <Link to='/perfil-medico' className="btn-perfil">
                                    Mi Perfil
                                </Link>
                            </li>
                        )}

                        <li>
                            <button className="btn btn-logout" onClick={onLogout}>
                                Salir
                            </button>
                        </li>
                    </>
                ) : (
                    // CASO B: Usuario Visitante (No logueado)
                    <>
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>
                        <li>
                            <Link to='/registro'>Registro</Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;