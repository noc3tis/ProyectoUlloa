const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config(); // Cargamos variables de entorno (.env)
const dbConexion = require('./conexion/dbConexion');
const cors = require('cors');

// Iniciamos conexión a Base de Datos
dbConexion();

const puerto = process.env.PUERTO || 5000;
const app = express();

// Middleware globales
app.use(cors()); // Permite la conexion entre puertos
app.use(express.json()); // Permite recibir JSON en el body
app.use(express.urlencoded({extended: false}));

// Ruta de prueba
app.get('/api/prueba', (req, res) =>{
    res.status(200).json({mensaje: 'El servidor esta funcionando'});   
});

// Definición de rutas principales
app.use('/api/medicos', require('./rutas/rutasMedicos'));
app.use('/api/citas', require('./rutas/rutasCitas'));
app.use('/api/usuarios', require('./rutas/rutasUsuarios'));


// Middleware de manejo de errores
app.use(errorHandler);

app.listen(puerto, () => console.log(`Servidor escuchando en puerto ${puerto}`));

//Manejador de errores
app.use(errorHandler);

app.listen(puerto, () => console.log(`Servidor escuchando en http://ns1.riosramos.jcarlos19.com.:${puerto}`));

