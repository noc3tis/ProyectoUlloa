import React from 'react';

const Registro = () => {
    return (
        <>
            <section className='heading'>
                <h1>Registro</h1>
            </section>
            <section className='form'>
                <form>
                    <div className='form-group'>
                        <input type='text' className='form-control' id='nombre' name='nombre'  placeholder='Introduzca su nombre completo'></input>
                    </div>
                    <div className='form-group'>
                        <input type='email' className='form-control' id='email' name='email' placeholder='Introduzca su email'></input>
                    </div>  
                    <div className='form-group'>
                        <input type='password' className='form-control' id='password' name='password' placeholder='Introduzca su contraseña'></input>
                    </div>
                    <div className='form-group'>
                         <input type='password' className='form-control' id='pasword2' name='password2' placeholder='Confirmar constraseña'></input>
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='ntn btn-block'>Enviar</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default Registro;
