import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerCitas, reset } from '../features/citas/citasSlice';
import Spinner from '../components/Spinner';

const DashboardDoctor = () => {
    const dispatch = useDispatch();
    const { citas, isLoading, isError, message } = useSelector((state) => state.citas);
    const { user } = useSelector((state) => state.auth);

    // Estado para filtrar por fecha (Por defecto: HOY)
    const [fechaFiltro, setFechaFiltro] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        if (isError) console.log(message);
        dispatch(obtenerCitas()); // El backend ya sabe que eres médico y traerá TUS pacientes
        return () => { dispatch(reset()) };
    }, [dispatch, isError, message]);

    if (isLoading) return <Spinner />;

    // --- LÓGICA DE AGENDA DIARIA ---
    // Filtramos las citas que coincidan con la fecha seleccionada en el calendario
    const citasDelDia = citas.filter(cita => {
        // La fecha en Mongo viene larga (2025-10-20T00:00:00.000Z), cortamos solo la parte YYYY-MM-DD
        const fechaCita = new Date(cita.fecha).toISOString().split('T')[0];
        return fechaCita === fechaFiltro;
    });

    return (
        <section className="content">
            <div className="heading">
                <h1>Panel Médico</h1>
                <p>Bienvenido, Dr. {user && user.nombre}</p>
            </div>

            {/* Selector de Fecha (Agenda) */}
            <div className="agenda-control">
                <label>Ver agenda del día: </label>
                <input 
                    type="date" 
                    value={fechaFiltro} 
                    onChange={(e) => setFechaFiltro(e.target.value)} 
                    className="form-control"
                    style={{maxWidth: '200px', display: 'inline-block', marginLeft: '10px'}}
                />
            </div>
            <br/>

            {/* TABLA DE HORARIOS (AGENDA) */}
            {citasDelDia.length > 0 ? (
                <div className="agenda-container">
                    {citasDelDia.map((cita) => (
                        <div key={cita._id} className={`agenda-item ${cita.estado}`}>
                            <div className="hora">
                                <h3>{cita.hora}</h3>
                            </div>
                            <div className="detalles">
                                <h4>Paciente: {cita.paciente.nombre}</h4>
                                <p>Email: {cita.paciente.email}</p>
                                <p>Notas: <i>"{cita.notas}"</i></p>
                                <span className={`badge estado-${cita.estado}`}>{cita.estado}</span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h3>No hay citas programadas para este día.</h3>
            )}
        </section>
    );
};

export default DashboardDoctor;