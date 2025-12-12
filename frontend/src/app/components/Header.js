import React from 'react';
/* * IMPORTANTE: <Link> vs <a>
 * Importamos 'Link' de react-router-dom.
 * * Pregunta de examen: ¿Por qué no usamos <a href="/login">?
 * R= Porque la etiqueta <a> recarga TODA la página (pantallazo blanco).
 * El componente <Link> cambia la URL internamente sin recargar nada.
 * ¡Eso hace que la app se sienta instantánea!
 */
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    return (
        /* * Usamos la clase 'header' que definimos en index.css 
         * para que tenga el borde abajo y se acomode bonito (Flexbox).
         */
        <header className="header">
            <ul>
                {/* * BOTÓN DE LOGIN
                 * Al hacer clic, React Router busca la ruta '/login' en App.js
                 * y muestra el componente <LogIn />.
                 */}
                <li>
                    <Link to='/login'>
                        Login
                    </Link>
                </li>

                {/* * BOTÓN DE REGISTRO
                 * Mismo caso, nos lleva a la pantalla de crear cuenta.
                 */}
                <li>
                    <Link to='/registro'>
                        Registro
                    </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;