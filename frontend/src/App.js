/* * ---------------------------------------------------------
 * 📦 ZONA DE IMPORTACIONES (TRAER LAS HERRAMIENTAS)
 * ---------------------------------------------------------
 * Aquí traemos 'react-router-dom'. Piensen en esto como el GPS de la app.
 * - Router: Es el "jefe" que vigila la URL del navegador.
 * - Routes y Route: Son los que dicen "Si estás en tal link, muestra tal pantalla".
 */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* * Importamos el CSS global para que no se vea feo.
 */
import './index.css';

/* * 📄 IMPORTACIÓN DE PÁGINAS (COMPONENTES)
 * Aquí mandamos llamar a todos los archivos que creamos en la carpeta 'components'.
 * Si crean una página nueva, TIENEN que importarla aquí para poder usarla.
 */
import Dashboard from './app/pages/Dashboard';
import LogIn from './app/pages/LogIn';
import Registro from './app/pages/Registro';
import Header from './app/components/Header';
//Se eliminaron problemas
// Importamos las páginas específicas de cada especialidad médica
import Cardiologia from './app/components/Especialidades/Cardiologia';
import Dermatologia from './app/components/Especialidades/Dermatologia';
import Ginecologia from './app/components/Especialidades/Ginecologia';
import MedicinaGeneral from './app/components/Especialidades/MedicinaGeneral';
import Pediatria from './app/components/Especialidades/Pediatria';
import Traumatologia from './app/components/Especialidades/Traumatologia';
import FormularioCita from './app/pages/FormularioCita';


function App() {
  return (
    /* * <Router>: Todo lo que esté adentro de esta etiqueta tiene "superpoderes"
     * de navegación. Sin esto, los links no funcionan.
     */
    <Router>
      <div className='container'>
        
        {/* * 👁️ OJO AQUÍ: El Header está AFUERA de <Routes>.
         * ¿Por qué? Porque queremos que el menú de arriba se vea SIEMPRE,
         * sin importar si estás en Login, en Cardiología o en Inicio.
         * Es la parte fija de la página.
         */}
        <Header />

        {/* * <Routes>: Aquí empieza la magia del cambio de pantallas.
         * React revisa la URL y busca la primera coincidencia aquí abajo.
         * Solo renderiza (muestra) UNO de estos a la vez.
         */}
        <Routes>
          
          {/* * CÓMO FUNCIONA UNA RUTA:
           * path: Es lo que escribes en el navegador (ej: localhost:3000/login)
           * element: Es el componente visual que se va a mostrar.
           */}

          {/* Ruta Raíz: Es la página principal cuando entras directo */}
          <Route path='/' element={<Dashboard />} />
          
          {/* Rutas de acceso (Login y Registro) */}
          <Route path='/login' element={<LogIn />}/>
          <Route path='/registro' element={<Registro/>}/>

          {/* * Rutas de Especialidades
           * Si el usuario pica el botón de "Cardiología", la URL cambia a '/cardiologia'
           * y React muestra el componente <Cardiologia />.
           */}
          <Route path='/cardiologia' element={<Cardiologia/>}/>
          <Route path='/dermatologia' element={<Dermatologia/>}/> {/* Corregí un typo: decía 'dermotologia' */}
          <Route path='/ginecologia' element={<Ginecologia/>}/>
          <Route path='/medicina' element={<MedicinaGeneral/>}/>
          <Route path='/pediatria' element={<Pediatria/>}/>
          <Route path='/traumatologia' element={<Traumatologia/>}/>
          <Route path='/agendar/:medicoId' element={<FormularioCita />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
