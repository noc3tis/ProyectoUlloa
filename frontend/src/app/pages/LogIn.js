import React from 'react';

const LogIn = () => {
    return (
        /* * <> ... </> : Esto se llama "Fragmento". 
         * React te obliga a que todo tu código viva dentro de UN solo padre.
         * Usamos esto para no llenar el HTML de <div> innecesarios.
         */
        <>
            {/* * SECCIÓN DE TÍTULO
             * Usamos 'className' en lugar de 'class' porque en React 'class'
             * es una palabra reservada para otra cosa.
             * Aquí usamos las clases de nuestro CSS para que se vea centrado y bonito.
             */ }
            <section className='heading'>
                <h1>Login</h1>
                <p>Inicie sesión</p>
            </section>

            {/* * SECCIÓN DEL FORMULARIO
             * Aquí están los inputs reales.
             * Nota: Ahorita el <form> no tiene función 'onSubmit', así que si le pican,
             * la página se va a recargar (lo cual arreglaremos luego con lógica).
             */ }
            <section className='form'>
                <form>
                    <div className='form-group'>
                        {/* Input del Email */}
                        <input 
                            type='email' 
                            className='form-control' 
                            id='email' 
                            name='email' 
                            placeholder='Introduzca su email' 
                        />
                    </div>
                    
                    <div className='form-group'> 
                        {/* Input del Password */}
                        <input 
                            type='password' 
                            className='form-control' 
                            id='password' 
                            name='password' 
                            placeholder='Introduzca su contraseña' 
                        />
                    </div>
                    
                    <div className='form-group'>
                        {/* Botón de envío. 'btn-block' hace que ocupe todo el ancho */}
                        <button type='submit' className='btn btn-block'>Entrar</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default LogIn;