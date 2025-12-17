import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerCitasDoctor, cancelarCita, reprogramarCita } from '../features/citas/citasSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { FaUserMd, FaCalendarDay, FaClock, FaEnvelope, FaStickyNote, FaMugHot, FaUserInjured } from 'react-icons/fa';

const DashboardDoctor = () => {
    const dispatch = useDispatch();
    const { citas, isLoading, isError, message } = useSelector((state) => state.citas);
    const { user } = useSelector((state) => state.auth);

    // ESTADO LOCAL (UI State):
    // Manejamos la fecha del filtro localmente. Iniciamos con la fecha de hoy.
    const [fechaFiltro, setFechaFiltro] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (isError) console.log(message);
        // Acción Específica de Rol: Traemos todas las citas asignadas a este médico
        dispatch(obtenerCitasDoctor());
    }, [dispatch, isError, message]);

    const handleCancelar = (id) => {
        if(window.confirm('¿Seguro que quieres cancelar esta cita?')) {
            dispatch(cancelarCita(id));
            toast.success('Cita cancelada');
        }
    }

    const handleReprogramar = (cita) => {
        const nuevaFechaStr = prompt("Ingresa la nueva fecha y hora (YYYY-MM-DD HH:MM):", "2025-12-18 10:00");
        if (nuevaFechaStr) {
            const nuevaFecha = new Date(nuevaFechaStr);
            if (isNaN(nuevaFecha.getTime())) {
                toast.error("Formato de fecha inválido");
                return;
            }
            dispatch(reprogramarCita({ id: cita._id, datos: { fecha: nuevaFecha } }));
            toast.success('Cita reprogramada');
        }
    }

    if (isLoading) return <Spinner />;

    // LÓGICA DE FILTRADO (Client-Side):
    // Filtramos el arreglo global de citas basándonos en el input de fecha del usuario.
    const listaCitas = Array.isArray(citas) ? citas : [];
    const citasDelDia = listaCitas.filter(cita => {
        if (!cita.fecha) return false; 
        const fechaObj = new Date(cita.fecha);
        // Convertimos a string local para comparar solo la parte de YYYY-MM-DD
        const fechaLocal = fechaObj.toLocaleDateString('en-CA');
        return fechaLocal === fechaFiltro;
    });

    return (
        <section className="content">
            <div className="heading">
                <h1><FaUserMd style={{marginBottom: '-5px'}}/> Panel Médico</h1>
                <p>Bienvenido, Dr. {user && user.nombre}</p>
            </div>

            {/* Control de Agenda (Filtro por fecha) */}
            <div className="agenda-control text-center mb-4">
                <label className="me-2"><FaCalendarDay /> Ver agenda del día: </label>
                <input 
                    type="date" 
                    value={fechaFiltro} 
                    onChange={(e) => setFechaFiltro(e.target.value)} 
                    className="form-control d-inline-block"
                    style={{maxWidth: '200px', marginLeft: '10px'}}
                />
            </div>

            {/* Renderizado de la Agenda Filtrada */}
            {citasDelDia.length > 0 ? (
                <div className="agenda-container">
                    {citasDelDia.map((cita) => (
                        <div key={cita._id} className={`agenda-item ${cita.estado || 'pendiente'}`}>
                            {/* ... Detalles de la cita ... */}
                            <div className="hora-box">
                                <h3>
                                    <FaClock style={{marginRight: '5px'}}/>
                                    {new Date(cita.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </h3>
                            </div>
                            <div className="detalles">
                                <h4><FaUserInjured /> Paciente: {cita.paciente ? cita.paciente.nombre : 'Desconocido'}</h4>
                                <p className="mb-1"><FaEnvelope /> {cita.paciente ? cita.paciente.email : ''}</p>
                                <p className="text-muted"><FaStickyNote /> <i>"{cita.notas || 'Sin notas'}"</i></p>
                                
                                <div className="acciones-doc mt-2">
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleReprogramar(cita)}>
                                        Reprogramar
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => handleCancelar(cita._id)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="vacio-mensaje text-center mt-5">
                    <FaMugHot size={50} color="#ccc" style={{marginBottom: '20px'}}/>
                    <h3>No hay citas para el {fechaFiltro}</h3>
                </div>
            )}
        </section>
    );
};

export default DashboardDoctor;