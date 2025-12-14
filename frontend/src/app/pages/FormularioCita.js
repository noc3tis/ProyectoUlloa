import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { crearCita, reset } from '../features/citas/citasSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const FormularioCita = () => {
  const { medicoId } = useParams(); // Obtenemos el ID del médico de la URL
  
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

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('¡Cita agendada con éxito!');
      navigate('/'); // Volver al inicio
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
    // Enviamos: ID del médico (URL) + Datos del form (State)
    dispatch(crearCita({ medico: medicoId, fecha, hora, notas }));
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