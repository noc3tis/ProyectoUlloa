const express = require('express')
const router = express.Router()
const { registrarUsuario, loginUsuario } = require('../controladores/controladorUsuarios')

// Endpoints públicos para entrar al sistema
router.post('/', registrarUsuario)
router.post('/login', loginUsuario)

module.exports = router