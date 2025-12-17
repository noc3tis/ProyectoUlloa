import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { crearCita, reset } from '../features/citas/citasSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const FormularioCita = () => {
  // ROUTING AVANZADO:
  // Capturamos el parámetro 'medicoId' que viene en la URL (/agendar/:medicoId).
  const { medicoId } = useParams(); 
  
  // FORMULARIO CONTROLADO:
  // Usamos useState para mantener el control total de los inputs.
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    notas: ''
  });
  const { fecha, hora, notas } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.citas
  );

  // EFECTO DE NAVEGACIÓN:
  // Escuchamos los cambios en el estado global.
  // Si la creación fue exitosa (isSuccess), redirigimos al Dashboard.
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('¡Cita agendada con éxito!');
      navigate('/'); 
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Preparación de Datos:
    // Combinamos fecha y hora en un objeto Date estándar ISO.
    const fechaCombinada = new Date(`${fecha}T${hora}`);
    
    // Disparamos la acción de crear cita con los datos procesados.
    dispatch(crearCita({ medico: medicoId, fecha: fechaCombinada, notas }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>Reservar Cita</h1>
        <p>Completa los datos para confirmar tu asistencia</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          {/* Inputs vinculados al state mediante 'value' y 'onChange' */}
          <div className="form-group">
            <label>Fecha</label>
            <input
              type="date"
              className="form-control"
              name="fecha"
              value={fecha}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Hora</label>
            <input
              type="time"
              className="form-control"
              name="hora"
              value={hora}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              name="notas"
              placeholder="Notas (síntomas, motivo de consulta...)"
              value={notas}
              onChange={onChange}
            ></textarea>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Confirmar Reserva
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default FormularioCita;