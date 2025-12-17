import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { obtenerCitas, cancelarCita, reprogramarCita, reset } from '../features/citas/citasSlice';
import Spinner from '../components/Spinner';
import { 
    FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUser, FaStethoscope 
} from 'react-icons/fa';

const DashboardEspecialidades = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { citas, isLoading, isError, message } = useSelector((state) => state.citas);

    useEffect(() => {
        if (isError) console.log(message);
        
        // Protección de Ruta: Si no hay usuario, redirigimos al Login.
        if (!user) navigate('/login');
        
        // Carga de Datos: Disparamos la acción para traer el historial del paciente.
        else dispatch(obtenerCitas());

        // Unmount: Limpiamos el estado al salir.
        return () => { dispatch(reset()); };
    }, [user, navigate, isError, message, dispatch]);

    // MANEJO DE ACCIONES (Cancelación):
    const handleCancelar = (id) => {
        // Confirmación nativa del navegador antes de ejecutar una acción destructiva.
        if (window.confirm('¿Estás seguro de cancelar esta cita? Esta acción liberará el horario.')) {
            dispatch(cancelarCita(id));
            toast.success('Cita cancelada correctamente');
        }
    };

    // MANEJO DE ACCIONES (Actualización/Reprogramación):
    const handleReprogramar = (cita) => {
        // Captura de datos simple.
        const nuevaFechaStr = prompt("Ingresa la nueva fecha y hora (YYYY-MM-DD HH:MM):", "2025-12-20 10:00");
        if (nuevaFechaStr) {
            const nuevaFecha = new Date(nuevaFechaStr);
            // Validación de formato antes de enviar al backend
            if (isNaN(nuevaFecha.getTime())) {
                toast.error("Formato de fecha inválido");
                return;
            }
            // Dispatch de la acción de actualización con el payload necesario
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

            {/* Menú de Navegación Rápida a Especialidades */}
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
                {/* Renderizado de Lista de Citas */}
                {citas.length > 0 ? (
                    <div className="citas-grid">
                        {citas.map((cita) => (
                            <div key={cita._id} className="cita-card">
                                {/* ... (Detalles visuales de la cita) ... */}
                                <div className="fecha-box">
                                    <h4 className="icon-text" style={{justifyContent: 'center'}}>
                                        <FaCalendarAlt /> {new Date(cita.fecha).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                                    </h4>
                                    <h3 className="icon-text" style={{justifyContent: 'center'}}>
                                        <FaClock /> {new Date(cita.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </h3>
                                </div>
                                
                                <div className="info-box">
                                    {/* Uso de operador condicional para evitar errores si el médico fue borrado */}
                                    <h5 className="icon-text">
                                        <FaStethoscope /> Dr. {cita.medico ? cita.medico.nombre : 'Médico no disponible'}
                                    </h5>
                                    {/* ... más detalles ... */}
                                    
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
                    // Estado Vacío (Empty State)
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