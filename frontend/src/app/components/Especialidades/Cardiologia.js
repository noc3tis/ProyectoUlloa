import React, { useEffect } from 'react';
// Importamos los Hooks de React-Redux para conectar este componente al store global.
// Esto nos permite acceder al estado de la aplicación.
import { useSelector, useDispatch } from 'react-redux'; 
import { getMedicos, reset } from '../../features/medicos/medicoSlice';
import Spinner from '../Spinner'; 
import { Link } from 'react-router-dom';

const Cardiologia = () => {
  // Inicialización del hook useDispatch para poder disparar acciones al Reducer.
  const dispatch = useDispatch();

  // Selección de Estado:
  // Utilizamos useSelector para suscribirnos a una parte específica del estado global ('medicos').
  // Desestructuramos las propiedades necesarias para la UI y el control de flujo.
  const { medicos, isLoading, isError, message } = useSelector(
    (state) => state.medicos
  );

  // Manejo del Ciclo de Vida:
  // En este caso, la petición asíncrona de datos al montar el componente.
  useEffect(() => {
    // Manejo de errores provenientes del backend
    if (isError) {
      console.log(message);
    }

    // Disparamos la acción asíncrona (Thunk) 'getMedicos' para poblar el estado.
    dispatch(getMedicos());

    // Cleanup Function:
    // Al salir de la vista, reseteamos el estado para garantizar que
    // la próxima navegación inicie limpia y sin datos residuales.
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]); // Array de dependencias para controlar la re-ejecución del efecto.

  // Renderizado Condicional:
  // Si la petición está en curso (pending), mostramos un componente de carga (Spinner)
  // para mejorar la Experiencia de Usuario (UX).
  if (isLoading) {
    return <Spinner />;
  }

  // Lógica de Filtrado en Cliente:
  // Filtramos el arreglo de médicos obtenido del estado global para mostrar
  // únicamente los correspondientes a esta vista (Cardiología).
  const cardiologos = medicos.filter(medico => medico.especialidad === 'Cardiologia');

  return (
    <section className="content">
      <div className="heading">
        <h1>Cardiología</h1>
        <p>Nuestros especialistas</p>
      </div>

      {/* Evaluación ternaria para renderizado de listas o estado vacío */}
      {cardiologos.length > 0 ? (
        <div className="medicos-grid">
          {/* Mapeo de datos (List Rendering):
              Iteramos sobre el arreglo filtrado para generar componentes dinámicos. */}
          {cardiologos.map((medico) => (
            <div key={medico._id} className="medico-card">
              <h3>{medico.nombre}</h3>
              <p>Consultorio: {medico.consultorio}</p>
              <p>Costo: ${medico.precioConsulta}</p>
              <p>Experiencia: {medico.experiencia}</p>
              
              {/* Navegación:
                  Usamos Link para navegación
                  Pasamos el ID del médico como parámetro de URL */}
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