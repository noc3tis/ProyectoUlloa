const express = require('express');
const router = express.Router();
const { agendarCita, obtenerMisCitas, getCitasDoctor, cancelarCita, reprogramarCita } = require('../controladores/controladorCitas');
const { proteger } = require('../middleware/authMiddleware');

router.post('/', proteger, agendarCita);
router.get('/', proteger, obtenerMisCitas);
router.get('/doctor', proteger, getCitasDoctor);
router.route('/:id')
    .delete(proteger, cancelarCita) 
    .put(proteger, reprogramarCita) 

module.exports = router;