const express = require('express')
const router = express.Router()
const { registrarUsuario, loginUsuario } = require('../controladores/controladorUsuarios')

router.post('/', registrarUsuario)
router.post('/login', loginUsuario)

module.exports = router