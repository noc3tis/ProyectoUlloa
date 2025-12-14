const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Usuario = require('../modelos/ModeloUsuario');

const proteger = asyncHandler(async(req, res, next) =>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ')[1];
            const decodificado = jwt.verify(token, process.env.JWT_SECRETO);
            req.usuario = await Usuario.findById(decodificado.id).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('No esta autorizado');
        }
    }

    if (! token) {
        res.status(401);
        throw new Error('No esta autorizado, no proporciono token');
    }
});

module.exports = {proteger}