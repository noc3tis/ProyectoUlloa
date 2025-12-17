import React from 'react';
import { useSelector } from 'react-redux';
import DashboardPaciente from './Dashboard(Especialidades)'; 
import DashboardDoctor from './DashboardDoctor'; 

const Dashboard = () => {
  // SELECCIÓN DE ESTADO:
  // Accedemos al usuario logueado desde Redux.
  const { user } = useSelector((state) => state.auth);

  // Protección básica: Si no hay usuario cargado aún, no renderizamos nada
  // (o podríamos poner un Spinner aquí).
  if (!user) {
    return null; 
  }

  // RENDERIZADO CONDICIONAL POR ROL :
  // Si el usuario tiene el claim 'medico', le mostramos su panel administrativo.
  // Si no, asumimos que es 'paciente' y le mostramos el catálogo de especialidades.
  if (user.rol === 'medico') {
    return <DashboardDoctor />;
  } else {
    return <DashboardPaciente />;
  }
};

export default Dashboard;