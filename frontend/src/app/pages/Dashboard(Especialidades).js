import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { obtenerCitas, cancelarCita, reprogramarCita, reset } from '../features/citas/citasSlice';
import Spinner from '../components/Spinner';
import { 
    FaCalendarAlt, 
    FaMapMarkerAlt, 
    FaClock, 
    FaUser, 
    FaClipboardList,
    FaStethoscope 
} from 'react-icons/fa';

const DashboardEspecialidades = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { citas, isLoading, isError, message } = useSelector((state) => state.citas);

    useEffect(() => {
        if (isError) console.log(message);
        if (!user) navigate('/login');
        else dispatch(obtenerCitas());

        return () => { dispatch(reset()); };
    }, [user, navigate, isError, message, dispatch]);

    const handleCancelar = (id) => {
        if (window.confirm('¿Estás seguro de cancelar esta cita? Esta acción liberará el horario.')) {
            dispatch(cancelarCita(id));
            toast.success('Cita cancelada correctamente');
        }
    };

    const handleReprogramar = (cita) => {
        const nuevaFechaStr = prompt("Ingresa la nueva fecha y hora (YYYY-MM-DD HH:MM):", "2025-12-20 10:00");
        if (nuevaFechaStr) {
            const nuevaFecha = new Date(nuevaFechaStr);
            if (isNaN(nuevaFecha.getTime())) {
                toast.error("Formato de fecha inválido");
                return;
            }
            dispatch(reprogramarCita({ id: cita._id, datos: { fecha: nuevaFecha } }));
            toast.success('Solicitud de cambio enviada');
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <>
            <section className='heading'>
                <h1>Hola, {user && user.nombre} <FaUser size={20} color="#666"/></h1>
                <p>¿Necesitas agendar una nueva consulta?</p>
            </section>

            <section className="contenedor-botones">
                <button className='btn'><Link to='/ginecologia' style={{color:'white', textDecoration:'none'}}>Ginecología</Link></button>
                <button className='btn'><Link to='/pediatria' style={{color:'white', textDecoration:'none'}}>Pediatría</Link></button>
                <button className='btn'><Link to='/medicina' style={{color:'white', textDecoration:'none'}}>Medicina General</Link></button>
                <button className='btn'><Link to='/traumatologia' style={{color:'white', textDecoration:'none'}}>Traumatología</Link></button>
                <button className='btn'><Link to='/dermatologia' style={{color:'white', textDecoration:'none'}}>Dermatología</Link></button>
                <button className='btn'><Link to='/cardiologia' style={{color:'white', textDecoration:'none'}}>Cardiología</Link></button>
            </section>

            <hr />

            <section className='heading'>
                <h3><FaCalendarAlt /> Mis Citas Programadas</h3>
            </section>

            <section className="content">
                {citas.length > 0 ? (
                    <div className="citas-grid">
                        {citas.map((cita) => (
                            <div key={cita._id} className="cita-card">
                                <div className="fecha-box">
                                    <h4 className="icon-text" style={{justifyContent: 'center'}}>
                                        <FaCalendarAlt /> {new Date(cita.fecha).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                                    </h4>
                                    <h3 className="icon-text" style={{justifyContent: 'center'}}>
                                        <FaClock /> {new Date(cita.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </h3>
                                </div>
                                
                                <div className="info-box">
                                    <h5 className="icon-text">
                                        <FaStethoscope /> Dr. {cita.medico ? cita.medico.nombre : 'Médico no disponible'}
                                    </h5>
                                    <p className="text-muted" style={{marginLeft: '24px'}}>
                                        {cita.medico ? cita.medico.especialidad : ''}
                                    </p>
                                    
                                    <p className="icon-text">
                                        <FaMapMarkerAlt color="var(--primary)"/> 
                                        {cita.medico ? cita.medico.consultorio : ''}
                                    </p>

                                    <p className="icon-text">
                                        <FaClipboardList /> Estado: <strong>{cita.estado}</strong>
                                    </p>
                                    
                                    <div className="acciones-botones">
                                        <button 
                                            className="btn btn-sm btn-primary" 
                                            onClick={() => handleReprogramar(cita)}
                                        >
                                            Reprogramar
                                        </button>
                                        <button 
                                            className="btn btn-sm btn-danger" 
                                            onClick={() => handleCancelar(cita._id)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <h3>No tienes citas próximas.</h3>
                        <p>Selecciona una especialidad arriba para agendar.</p>
                    </div>
                )}
            </section>
        </>
    );
};

export default DashboardEspecialidades;