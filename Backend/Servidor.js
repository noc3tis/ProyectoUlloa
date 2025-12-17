const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware'); //Entre llaves para que solo sea una variable 
const dotenv = require('dotenv').config();
const dbConexion = require('./conexion/dbConexion');
const cors = require('cors');


dbConexion();
const puerto = process.env.PUERTO || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));



app.get('/api/prueba', (req, res) =>{
    res.status(200).json({mensaje: 'El servidor esta funcionando'});   
});

app.use('/api/medicos', require('./rutas/rutasMedicos'));
app.use('/api/citas', require('./rutas/rutasCitas'));
app.use('/api/usuarios', require('./rutas/rutasUsuarios'));


app.use(errorHandler);

app.listen(puerto, () => console.log(`Servidor escuchando en http://ns1.riosramos.jcarlos19.com.:${puerto}`));