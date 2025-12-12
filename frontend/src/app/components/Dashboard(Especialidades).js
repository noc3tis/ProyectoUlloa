import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DashboardEspecialidades = () => {
    return (
        <>
        <section className='heading'>
            <h1> Dashboard</h1>
            <p>Nuestras especialidades:</p>
        </section>
        <section>
           <button>
               <Link to='/ginecologia'> Ginecología y Obstetricia </Link>
           </button>
           <button>
                <Link to='/pediatria'>Pediatría</Link>
           </button> 
           <button>
                <Link to='/medicina'>Medicina General</Link>
           </button> 
           <button>
                <Link to='/traumatologia'>Traumatología</Link>
           </button> 
           <button>
                <Link to='/dermotologia'>Dermatología</Link>
           </button>
           <button>
                <Link to='/cardiologia'>Cardiología</Link>
           </button> 

        </section>
        </>
    );
}

export default DashboardEspecialidades;
