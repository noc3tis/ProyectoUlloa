import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authentication/authSlice';
import { FaHospitalUser, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUserMd } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        
        dispatch(reset());
        
        navigate('/login');
    };

    return (
        <header className="header">
            <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit'}}>
                <FaHospitalUser size={24} /> <span>DocApp</span>
            </Link>

            <ul>
                {user ? (
                    <>
                        <li style={{marginRight: '15px', fontWeight: 'bold'}}>
                            Hola, {user.nombre}
                        </li>

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