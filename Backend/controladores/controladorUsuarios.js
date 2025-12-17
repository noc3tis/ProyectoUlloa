const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../modelos/ModeloUsuario') 

const registrarUsuario = asyncHandler(async (req, res) => {
  const { nombre, email, password, rol } = req.body

  if (!nombre || !email || !password) {
    res.status(400)
    throw new Error('Por favor completa todos los campos')
  }

  const usuarioExiste = await User.findOne({ email })
  if (usuarioExiste) {
    res.status(400)
    throw new Error('Ese usuario ya existe')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const usuario = await User.create({
    nombre,
    email,
    password: hashedPassword,
    rol: rol || 'paciente' 
  })

  if (usuario) {
    res.status(201).json({
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: req.body.rol ? req.body.rol : 'paciente', 
      token: generateToken(usuario._id),
    })
  } else {
    res.status(400)
    throw new Error('Datos de usuario no válidos')
  }
});

const loginUsuario = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const usuario = await User.findOne({ email })

  if (usuario && (await bcrypt.compare(password, usuario.password))) {
    res.json({
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generateToken(usuario._id), 
    })
  } else {
    res.status(401)
    throw new Error('Credenciales incorrectas')
  }
})

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETO || 'secreto123', {
    expiresIn: '30d',
  })
}

module.exports = {
  registrarUsuario,
  loginUsuario,
  getMe,
}