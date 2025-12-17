const express = require('express');
const router = express.Router();
const { agendarCita, obtenerMisCitas, getCitasDoctor, cancelarCita, reprogramarCita } = require('../controladores/controladorCitas');
const { proteger } = require('../middleware/authMiddleware');

// Todas estas rutas están protegidas, se requiere un token
router.post('/', proteger, agendarCita);      // Crear cita
router.get('/', proteger, obtenerMisCitas);   // Leer citas (Paciente)
router.get('/doctor', proteger, getCitasDoctor); // Leer citas (Doctor)

// Rutas dinámicas con ID
router.route('/:id')
    .delete(proteger, cancelarCita)    // Borrar
    .put(proteger, reprogramarCita)    // Actualizar

module.exports = router;