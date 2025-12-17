const express = require('express');
const router = express.Router();
const { getMedicos, updatePerfilMedico, getMiPerfil } = require('../controladores/controladorMedicos');
const { proteger } = require('../middleware/authMiddleware');

router.get('/', getMedicos);
router.post('/', proteger, updatePerfilMedico);
router.get('/perfil', proteger, getMiPerfil);

module.exports = router;