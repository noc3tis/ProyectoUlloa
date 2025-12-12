import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './index.css';
import DashboardEspecialidades from './app/components/Dashboard(Especialidades)';
import LogIn from './app/components/LogIn';
import Registro from './app/components/Registro';
import Header from './app/components/Header';
import Cardiologia from './app/components/Especialidades/Cardiologia';
import Dermatologia from './app/components/Especialidades/Dermatologia';
import Ginecologia from './app/components/Especialidades/Ginecologia';
import MedicinaGeneral from './app/components/Especialidades/MedicinaGeneral';
import Pediatria from './app/components/Especialidades/Pediatria';
import Traumatologia from './app/components/Especialidades/Traumatologia';

function App() {
  return (
    <Router>
    <div className='container'>
    <Header />
      <Routes>
          <Route path='/' element={<DashboardEspecialidades />}/>
          <Route path='/login' element={<LogIn />}/>
          <Route path='/registro' element={<Registro/>}/>
          <Route path='/cardiologia' element={<Cardiologia/>}/>
          <Route path='/dermotologia' element={<Dermatologia/>}/>
          <Route path='/ginecologia' element={<Ginecologia/>}/>
          <Route path='/medicina' element={<MedicinaGeneral/>}/>
          <Route path='/pediatria' element={<Pediatria/>}/>
          <Route path='/traumatologia' element={<Traumatologia/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
