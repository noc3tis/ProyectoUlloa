import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { obtenerCitas, cancelarCita, reset } from '../features/citas/citasSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const MisCitas = () => {
    const dispatch = useDispatch();

    const { citas, isLoading, isError, message } = useSelector((state) => state.citas);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(obtenerCitas());

        return () => { dispatch(reset()) };
    }, [dispatch, isError, message]);

    const handleCancelar = (id) => {
        if(window.confirm('¿Seguro que quieres cancelar esta cita?')) {
            dispatch(cancelarCita(id));
            toast.info('Cita cancelada');
        }
    }

    if (isLoading) return <Spinner />;

    return (
        <section className="content">
            <div className="heading">
                <h1>Mis Citas</h1>
                <p>Gestiona tus próximas consultas</p>
            </div>

            {citas.length > 0 ? (
                <div className="citas-grid">
                    {citas.map((cita) => (
                        <div key={cita._id} className={`cita-card ${cita.estado}`}>
                            {/* Mostrar fecha bonita */}
                            <h3>{new Date(cita.fecha).toLocaleDateString()} - {cita.hora}</h3>
                            
                            {/* Mostrar datos del médico (gracias al populate del backend) */}
                            {cita.medico ? (
                                <p>Dr/a. {cita.medico.nombre}</p> 
                            ) : <p>Médico no disponible</p>}
                            
                            <p>Estado: <span className={`estado-${cita.estado}`}>{cita.estado}</span></p>

                            {/* Solo mostrar botones si la cita NO está cancelada */}
                            {cita.estado !== 'cancelada' && (
                                <div className="acciones">
                                    <button onClick={() => handleCancelar(cita._id)} className="btn btn-danger">
                                        Cancelar
                                    </button>
                                    {/* Para reprogramar, lo más fácil es cancelar y pedir que reserven de nuevo, 
                                        o redirigir a un form de edición. Por tiempo, cancelar es más efectivo. */}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <h3>No tienes citas agendadas aún.</h3>
            )}
        </section>
    );
};

export default MisCitas;