import React from 'react';
/* * Importamos Link para la navegación. 
 * 'useNavigate' lo importaste, pero ojo: aquí NO se está usando. 
 * Se podría borrar para limpiar el código, pero no estorba.
 */
import { Link, useNavigate } from 'react-router-dom';

const DashboardEspecialidades = () => {
    return (
        <>
        {/* * TÍTULO DEL DASHBOARD
         * Usamos las mismas clases 'heading' que en Login para mantener
         * el estilo consistente (que se vea igual en toda la app).
         */}
        <section className='heading'>
            <h1> Dashboard</h1>
            <p>Nuestras especialidades:</p>
        </section>

        {/* * BOTONES DE NAVEGACIÓN
         * Aquí están los accesos directos a cada área del hospital.
         * * NOTA TÉCNICA PARA LA CLASE:
         * Estamos metiendo un <Link> dentro de un <button>. 
         * Funciona, pero lo ideal en React es darle estilo de botón 
         * directamente al <Link> usando CSS (className='btn').
         * Pero para empezar, ¡así se entiende perfecto!
         */}
        <section>
           
           {/* Botón 1: Ginecología */}
           <button>
                {/* Al hacer clic, React Router cambia la URL a /ginecologia */}
                <Link to='/ginecologia'> Ginecología y Obstetricia </Link>
           </button>

           {/* Botón 2: Pediatría */}
           <button>
                <Link to='/pediatria'>Pediatría</Link>
           </button> 
           
           {/* Botón 3: Medicina General */}
           <button>
                <Link to='/medicina'>Medicina General</Link>
           </button> 
           
           {/* Botón 4: Traumatología */}
           <button>
                <Link to='/traumatologia'>Traumatología</Link>
           </button> 
           
           {/* Botón 5: Dermatologia */}
           <button>
                <Link to='/dermatologia'>Dermatología</Link>
           </button>

           {/* Botón 6: Cardiología */}
           <button>
                <Link to='/cardiologia'>Cardiología</Link>
           </button> 

        </section>
        </>
    );
}

export default DashboardEspecialidades;