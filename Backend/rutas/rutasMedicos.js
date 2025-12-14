const express = require('express');
const router = express.Router();
const { getMedicos, updatePerfilMedico } = require('../controladores/controladorMedicos');
const { proteger } = require('../middleware/authMiddleware');

router.get('/', getMedicos);
router.post('/', proteger, updatePerfilMedico);

module.exports = router;