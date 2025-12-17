import React from 'react';
import { useSelector } from 'react-redux';
import DashboardPaciente from './Dashboard(Especialidades)'; 
import DashboardDoctor from './DashboardDoctor'; 

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null; 
  }

  if (user.rol === 'medico') {
    return <DashboardDoctor />;
  } else {
    return <DashboardPaciente />;
  }
};

export default Dashboard;