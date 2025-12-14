const express = require('express');
const router = express.Router();
const { agendarCita, obtenerMisCitas } = require('../controladores/controladorCitas');
const { proteger } = require('../middleware/authMiddleware');

router.post('/', proteger, agendarCita);
router.get('/', proteger, obtenerMisCitas);

module.exports = router;