import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMedicos, reset } from '../../features/medicos/medicoSlice';
import Spinner from '../Spinner';

const Traumatologia = () => { // <--- 1. CAMBIAR NOMBRE DEL COMPONENTE (Ej: Dermatologia)
  const dispatch = useDispatch();

  const { medicos, isLoading, isError, message } = useSelector(
    (state) => state.medicos
  );

  useEffect(() => {
    if (isError) console.log(message);
    dispatch(getMedicos());
    return () => { dispatch(reset()) };
  }, [isError, message, dispatch]);

  if (isLoading) return <Spinner />;

  // --- FILTRO DE ESPECIALIDAD ---
  // IMPORTANTE: Este texto debe ser IDÉNTICO a como lo guardaste en la Base de Datos
  const medicosFiltrados = medicos.filter(medico => 
      medico.especialidad === 'Traumatologia' // <--- 2. CAMBIAR AQUÍ LA ESPECIALIDAD
  );

  return (
    <section className="content">
      <div className="heading">
        {/* <--- 3. CAMBIAR EL TÍTULO VISUAL */}
        <h1>Dermatología</h1> 
        <p>Nuestros especialistas</p>
      </div>

      {medicosFiltrados.length > 0 ? (
        <div className="medicos-grid">
          {medicosFiltrados.map((medico) => (
            <div key={medico._id} className="medico-card">
              <h3>Dr. {medico.usuario.nombre}</h3>
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
        <h3>No hay especialistas disponibles en esta área por el momento.</h3>
      )}
    </section>
  );
};

export default Traumatologia; // <--- 4. EXPORTAR CON EL NOMBRE CORRECTO