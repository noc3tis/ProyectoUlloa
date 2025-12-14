import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMedicos, reset } from '../../features/medicos/medicoSlice'; // Ajusta la ruta si es necesario
import Spinner from '../Spinner'; 
import { Link } from 'react-router-dom';
// Si no tienes un componente DoctorItem, lo haremos HTML directo por ahora

const Cardiologia = () => {
  const dispatch = useDispatch();

  // 1. Traemos los datos de Redux
  const { medicos, isLoading, isError, message } = useSelector(
    (state) => state.medicos
  );

  // 2. Pedimos los médicos al cargar la página
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getMedicos());

    // Al salir de la página, limpiamos el estado (opcional, depende de tu gusto)
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  // 3. FILTRAR: Solo queremos cardiólogos
  // Asegúrate que en tu BD la especialidad esté escrita EXACTAMENTE igual ("Cardiología")
  const cardiologos = medicos.filter(medico => medico.especialidad === 'Cardiología');

  return (
    <section className="content">
      <div className="heading">
        <h1>Cardiología</h1>
        <p>Nuestros especialistas</p>
      </div>

      {cardiologos.length > 0 ? (
        <div className="medicos-grid">
          {cardiologos.map((medico) => (
            /* TARJETA DEL MÉDICO */
            <div key={medico._id} className="medico-card">
              <h3>Dr. {medico.usuario.nombre}</h3> {/* .usuario.nombre viene del populate */}
              <p>Consultorio: {medico.consultorio}</p>
              <p>Horario: {medico.horarioAtencion.inicio} - {medico.horarioAtencion.fin}</p>
              <p>Costo: ${medico.precioConsulta}</p>
              
              <Link to={`/agendar/${medico._id}`} className="btn btn-reverse btn-block">
                    Agendar Cita
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h3>No hay cardiólogos disponibles en este momento</h3>
      )}
    </section>
  );
};

export default Cardiologia;