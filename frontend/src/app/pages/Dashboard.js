import React from 'react';
import { useSelector } from 'react-redux';

// 1. Importamos tus DOS dashboards
// Ajusta la ruta si 'Dashboard(Especialidades)' está en components
import DashboardPaciente from './Dashboard(Especialidades)'; 
import DashboardDoctor from './DashboardDoctor'; // El que acabamos de crear

const Dashboard = () => {
  // 2. Leemos quién es el usuario desde Redux
  const { user } = useSelector((state) => state.auth);

  // Si por alguna razón no hay usuario (ej. recargó página), no mostramos nada aún
  if (!user) {
    return null; 
  }

  // 3. EL SEMÁFORO: Decidimos qué componente retornar
  if (user.rol === 'medico') {
    return <DashboardDoctor />;
  } else {
    // Si es paciente (o cualquier otro rol), ve las especialidades
    return <DashboardPaciente />;
  }
};

export default Dashboard;