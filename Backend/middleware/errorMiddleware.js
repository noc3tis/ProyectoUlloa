const errorHandler = (err, req, res, next) => {
    // Si el error ya traía un código (ej: 404), lo respetamos. Si no, ponemos 500 (Error del Servidor).
    const codigoEstado = res.statusCode ? res.statusCode : 500;
    
    res.status(codigoEstado);
    
    // Devolvemos el mensaje en JSON para que el Frontend (React) pueda mostrarlo en una alerta.
    res.json({
        mensaje: err.message,
        // stack: process.env.NODE_ENV === 'production' ? null : err.stack // Opcional: Ocultar stack en prod
    });
}

module.exports = { errorHandler };