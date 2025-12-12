//Este es igual que el login pero con mas inputs
import React from 'react';

const Registro = () => {
    return (
        <>
            <section className='heading'>
                <h1>Registro</h1>
            </section>

            <section className='form'>
                <form>
                    {/* 1. Nombre Completo */}
                    <div className='form-group'>
                        <input 
                            type='text' 
                            className='form-control' 
                            id='nombre' 
                            name='nombre'  
                            placeholder='Introduzca su nombre completo'
                        />
                    </div>

                    {/* 2. Email (Será su usuario único) */}
                    <div className='form-group'>
                        <input 
                            type='email' 
                            className='form-control' 
                            id='email' 
                            name='email' 
                            placeholder='Introduzca su email'
                        />
                    </div>  

                    {/* 3. Contraseña Original */}
                    <div className='form-group'>
                        <input 
                            type='password' 
                            className='form-control' 
                            id='password' 
                            name='password' 
                            placeholder='Introduzca su contraseña'
                        />
                    </div>

                    {/* 4. Confirmar Contraseña
                     * Este campo es puro Frontend. No se manda a la base de datos.
                     * Sirve para asegurar que el usuario no se equivocó al escribir.
                     * OJO: Corregí el id 'password2' (antes decía pasword2)
                     */ }
                    <div className='form-group'>
                         <input 
                            type='password' 
                            className='form-control' 
                            id='password2' 
                            name='password2' 
                            placeholder='Confirmar contraseña'
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Enviar</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Registro;