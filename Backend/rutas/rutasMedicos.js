const express = require('express');
const router = express.Router();
const { getMedicos, updatePerfilMedico, getMiPerfil } = require('../controladores/controladorMedicos');
const { proteger } = require('../middleware/authMiddleware');

// Esta ruta es pública: Cualquiera puede ver la lista de doctores para elegir
router.get('/', getMedicos);

// Estas son privadas: Solo el médico dueño de la cuenta puede editar su perfil
router.post('/', proteger, updatePerfilMedico);
router.get('/perfil', proteger, getMiPerfil);

module.exports = router;