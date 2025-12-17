import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMedicos, reset } from '../../features/medicos/medicoSlice';
import Spinner from '../Spinner'; 
import { Link } from 'react-router-dom';

const Cardiologia = () => {
  const dispatch = useDispatch();

  const { medicos, isLoading, isError, message } = useSelector(
    (state) => state.medicos
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getMedicos());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const cardiologos = medicos.filter(medico => medico.especialidad === 'Cardiologia');

  return (
    <section className="content">
      <div className="heading">
        <h1>Cardiología</h1>
        <p>Nuestros especialistas</p>
      </div>

      {cardiologos.length > 0 ? (
        <div className="medicos-grid">
          {cardiologos.map((medico) => (
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
        <h3>No hay cardiólogos disponibles en este momento</h3>
      )}
    </section>
  );
};

export default Cardiologia;