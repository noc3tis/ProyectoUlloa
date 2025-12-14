const express = require('express');
const router = express.Router();
const { agendarCita, obtenerMisCitas, cancelarCita, reprogramarCita } = require('../controladores/controladorCitas');
const { proteger } = require('../middleware/authMiddleware');

router.post('/', proteger, agendarCita);
router.get('/', proteger, obtenerMisCitas);
router.put('/cancelar/:id', proteger, cancelarCita); // Cancelar
router.put('/:id', proteger, reprogramarCita);       // Reprogramar

module.exports = router;