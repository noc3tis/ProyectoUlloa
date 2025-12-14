const asyncHandler  = require('express-async-handler');
const Cita = require('../modelos/ModeloCita');

const agendarCita = asyncHandler(async (req, res) => {
    const { medico, fecha, hora, notas } = req.body;

    if (!medico || !fecha || !hora) {
        res.status(400);
        throw new Error('Por favor rellena los campos necesarios');
    }

    const cita = await Cita.create({
        paciente: req.usuario.id,
        medico,
        fecha,
        hora,
        notas
    });

    res.status(201).json(cita);
});

const obtenerMisCitas = asyncHandler(async (req, res) => {
    const citas = await Cita.find({paciente: req.usuario.id}).populate('medico', 'nombre especialidad consultorio');

    res.status(200).json(citas);
});

module.exports = {
    agendarCita,
    obtenerMisCitas
}

