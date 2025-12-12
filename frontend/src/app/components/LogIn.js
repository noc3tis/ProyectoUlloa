import React from 'react';

const LogIn = () => {
    return (
        <>
        <section className='heading'>
            <h1> Login</h1>
            <p>Inicie sesion</p>
        </section>
        <section className='form'>
            <form >
                <div className='form-group'>
                    <input type='email' className='form-control' id='email' name='email' placeholder='Introduzca su email'  />
                </div>
                <div>
                    <input type='password' className='form-control' id='password' name='password'  placeholder='Introduzca su contraseña' ></input>
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>Entrar</button>
                </div>
            </form>
        </section>
        </>
    );
}

export default LogIn;
