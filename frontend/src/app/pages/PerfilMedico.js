import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { crearPerfilMedico, obtenerPerfilMedico, reset } from '../features/medicos/medicoSlice';
import Spinner from '../components/Spinner';

const PerfilMedico = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { perfil, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.medicos
  );

  // ESTADO DEL FORMULARIO (Controlled Components):
  const [formData, setFormData] = useState({
    especialidad: '',
    consultorio: '',
    horarioInicio: '',
    horarioFin: '',
    precioConsulta: '',
    experiencia: ''
  });

  const { especialidad, consultorio, horarioInicio, horarioFin, precioConsulta, experiencia } = formData;

  // EFECTO DE CARGA INICIAL:
  // Al entrar, pedimos el perfil actual del médico a la BD.
  useEffect(() => {
    dispatch(obtenerPerfilMedico());
  }, [dispatch]);

  // Este useEffect "observa" la variable 'perfil' que viene de Redux.
  // Cuando Redux recibe los datos del backend, este efecto se dispara y actualiza
  // el estado local del formulario. Esto permite la funcionalidad de "Edición".
  useEffect(() => {
    if (perfil) {
      setFormData({
        especialidad: perfil.especialidad || '',
        consultorio: perfil.consultorio || '',
        horarioInicio: perfil.horarioAtencion?.inicio || '',
        horarioFin: perfil.horarioAtencion?.fin || '',
        precioConsulta: perfil.precioConsulta || '',
        experiencia: perfil.experiencia || ''
      });
    }
  }, [perfil]); 


  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess) {
      alert('Perfil guardado con éxito');
      navigate('/'); 
    }
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Transformación de Datos:
    // Estructuramos los datos planos del formulario al formato anidado
    // que espera nuestro Schema de Mongoose en el backend.
    const datosParaEnviar = {
        especialidad,
        consultorio,
        horarioAtencion: {
            inicio: horarioInicio,
            fin: horarioFin
        },
        precioConsulta,
        experiencia
    };

    dispatch(crearPerfilMedico(datosParaEnviar));
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="container mt-5">
      <h2>Completa tu Perfil Profesional</h2>
      <p>Esta información será visible para los pacientes.</p>

      <form onSubmit={onSubmit}>
        {/* ... Inputs del formulario vinculados al state ... */}
        <div className="mb-3">
          <label>Especialidad</label>
          <select 
            className="form-control" 
            name="especialidad" 
            value={especialidad} 
            onChange={onChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="Medicina General">Medicina General</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Pediatria">Pediatría</option>
            <option value="Dermatologia">Dermatologia</option>
            <option value="Ginecologia">Ginecologia</option>
            <option value="Traumatologia">Traumatologia</option>
          </select>
        </div>

        {/* ... Resto de campos (Consultorio, Precio, etc.) ... */}
        <div className="mb-3">
          <label>Dirección del Consultorio</label>
          <input
            type="text"
            className="form-control"
            name="consultorio"
            value={consultorio}
            onChange={onChange}
            placeholder="Ej: Av. Juárez 123, Consultorio 4B"
            required
          />
        </div>

        <div className="mb-3">
          <label>Precio de Consulta ($)</label>
          <input
            type="number"
            className="form-control"
            name="precioConsulta"
            value={precioConsulta}
            onChange={onChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Biografía / Experiencia</label>
          <textarea
            className="form-control"
            name="experiencia"
            value={experiencia}
            onChange={onChange}
            rows="3"
            placeholder="Cuéntale a tus pacientes sobre tu trayectoria..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Guardar Perfil
        </button>
      </form>
    </div>
  );
};

export default PerfilMedico;