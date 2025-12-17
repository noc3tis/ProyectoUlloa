import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMedicos, reset } from '../../features/medicos/medicoSlice';
import Spinner from '../Spinner';

const MedicinaGeneral = () => {
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

  const generales = medicos.filter(medico => 
      medico.especialidad === 'MedicinaGeneral' 
  );

  return (
    <section className="content">
      <div className="heading">
        <h1>Medicina General</h1> 
        <p>Nuestros especialistas</p>
      </div>

      {generales.length > 0 ? (
        <div className="medicos-grid">
          {generales.map((medico) => (
            <div key={medico._id} className="medico-card">
              <h3>{medico.nombre}</h3>
              <p>Consultorio: {medico.consultorio}</p>
              <p>Costo: ${medico.precioConsulta}</p>
              <p>Experiencia: {medico.experiencia}</p>
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

export default MedicinaGeneral;