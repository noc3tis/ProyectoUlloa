import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Dashboard from './app/pages/Dashboard';
import LogIn from './app/pages/LogIn';
import Registro from './app/pages/Registro';
import Header from './app/components/Header';
<<<<<<< HEAD
=======
//Se eliminaron problemas
// Importamos las páginas específicas de cada especialidad médica
>>>>>>> e45d900370e4d2c57ba206e853e312a02be87eef
import Cardiologia from './app/components/Especialidades/Cardiologia';
import Dermatologia from './app/components/Especialidades/Dermatologia';
import Ginecologia from './app/components/Especialidades/Ginecologia';
import MedicinaGeneral from './app/components/Especialidades/MedicinaGeneral';
import Pediatria from './app/components/Especialidades/Pediatria';
import Traumatologia from './app/components/Especialidades/Traumatologia';
import FormularioCita from './app/pages/FormularioCita';
import DashboardDoctor from './app/pages/DashboardDoctor';
import PerfilMedico from './app/pages/PerfilMedico'


function App() {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<LogIn />}/>
          <Route path='/registro' element={<Registro/>}/>
          <Route path='/cardiologia' element={<Cardiologia/>}/>
          <Route path='/dermatologia' element={<Dermatologia/>}/> 
          <Route path='/ginecologia' element={<Ginecologia/>}/>
          <Route path='/medicina' element={<MedicinaGeneral/>}/>
          <Route path='/pediatria' element={<Pediatria/>}/>
          <Route path='/traumatologia' element={<Traumatologia/>}/>
          <Route path='/agendar/:medicoId' element={<FormularioCita />} />
          <Route path='/doctor-dashboard' element={<DashboardDoctor />} />
          <Route path='/perfil-medico' element={<PerfilMedico/>} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
