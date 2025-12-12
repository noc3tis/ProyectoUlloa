//Este es el index, en general solo contiene todas las importaciones para que la app funcione, asi que no le muevan a nada de aqui
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; //El index.css es el que le da estilo a toda la aplicacion en general, de momento no hay un estilo unico para cada parte de la app pero pueden hacerlo si quieren
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

