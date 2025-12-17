const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs') // Librería para hashear contraseñas 
const asyncHandler = require('express-async-handler')
const User = require('../modelos/ModeloUsuario') 

const registrarUsuario = asyncHandler(async (req, res) => {
  const { nombre, email, password, rol } = req.body

  // Validaciones de entrada 
  if (!nombre || !email || !password) {
    res.status(400)
    throw new Error('Por favor completa todos los campos')
  }

  // Verificamos duplicados para mantener la integridad de la BD
  const usuarioExiste = await User.findOne({ email })
  if (usuarioExiste) {
    res.status(400)
    throw new Error('Ese usuario ya existe')
  }

  // Seguridad: Hasheamos la contraseña antes de guardarla.
  // Nunca guardamos texto plano.
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const usuario = await User.create({
    nombre,
    email,
    password: hashedPassword, // Guardamos el hash
    rol: rol || 'paciente' 
  })

  //Regreasamos al usuario a traves de un json
  if (usuario) {
    res.status(201).json({
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: req.body.rol ? req.body.rol : 'paciente', 
      token: generateToken(usuario._id), // Devolvemos el JWT de una vez
    })
  } else {
    res.status(400)
    throw new Error('Datos de usuario no válidos')
  }
});

const loginUsuario = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const usuario = await User.findOne({ email })

  // Seguridad: Comparamos la contraseña plana con el hash de la BD
  if (usuario && (await bcrypt.compare(password, usuario.password))) {
    res.json({
      _id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      token: generateToken(usuario._id), // Enviamos el token para la sesión
    })
  } else {
    res.status(401)
    throw new Error('Credenciales incorrectas')
  }
})

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Función helper para generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETO || 'secreto123', {
    expiresIn: '30d', // El token expira en 30 días
  })
}

module.exports = {
  registrarUsuario,
  loginUsuario,
  getMe,
}