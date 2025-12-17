const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Usuario = require('../modelos/ModeloUsuario');

// Este middleware protege las rutas.
const proteger = asyncHandler(async(req, res, next) => {
    let token;

    // Verificamos si la petición trae un header que diga "Bearer eyJhbGci..."
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Sacamos el token puro (quitamos la palabra "Bearer")
            token = req.headers.authorization.split(' ')[1];

            // Verificamos la firma digital con nuestra clave secreta
            const decodificado = jwt.verify(token, process.env.JWT_SECRETO || 'secreto123');

            // Buscamos al usuario en la BD usando el ID que venía dentro del token.
            // Traemos todo lo del usuario menos la constraseña
            req.usuario = await Usuario.findById(decodificado.id).select('-password');

            // Todo bien, pasa a la siguiente función (el controlador)
            next();
        } catch (error) {
            console.log(error);
            res.status(401); // 401 = Unauthorized
            throw new Error('No esta autorizado, token inválido');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('No esta autorizado, no proporciono token');
    }
});

module.exports = { proteger }