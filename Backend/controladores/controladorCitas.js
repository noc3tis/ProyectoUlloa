const asyncHandler  = require('express-async-handler');
const Cita = require('../modelos/ModeloCita');
const Medico = require('../modelos/ModeloMedico.'); // <--- AGREGAR ESTO ARRIBA
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
    
    // CASO 1: EL USUARIO ES UN MÉDICO
    if (req.usuario.rol === 'medico') {
        // Primero buscamos cuál es el ID de su perfil médico (no es el mismo que su usuario)
        const perfilMedico = await Medico.findOne({ usuario: req.usuario.id });

        if (!perfilMedico) {
            res.status(404);
            throw new Error('No tienes un perfil médico configurado aún.');
        }

        // Buscamos las citas donde él es el doctor
        const citas = await Cita.find({ medico: perfilMedico._id })
            .populate('paciente', 'nombre email') // Traemos datos del paciente
            .sort({ fecha: 1, hora: 1 }); // Ordenamos por fecha y hora

        res.status(200).json(citas);

    } else {
        // CASO 2: EL USUARIO ES UN PACIENTE (Lo que ya tenías)
        const citas = await Cita.find({ paciente: req.usuario.id })
            .populate('medico', 'especialidad consultorio')
            .sort({ fecha: 1, hora: 1 });

        res.status(200).json(citas);
    }
});

// @desc    Cancelar una cita (Cambiar estado a 'cancelada')
// @ruta    PUT /api/citas/cancelar/:id
// @acceso  Privado
const cancelarCita = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
        res.status(404);
        throw new Error('Cita no encontrada');
    }

    // Verificar que el usuario sea el dueño de la cita
    if (cita.paciente.toString() !== req.usuario.id) {
        res.status(401);
        throw new Error('No autorizado para cancelar esta cita');
    }

    cita.estado = 'cancelada';
    const citaActualizada = await cita.save();

    res.status(200).json(citaActualizada);
});

// @desc    Reprogramar una cita (Cambiar fecha/hora)
// @ruta    PUT /api/citas/:id
// @acceso  Privado
const reprogramarCita = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
        res.status(404);
        throw new Error('Cita no encontrada');
    }

    if (cita.paciente.toString() !== req.usuario.id) {
        res.status(401);
        throw new Error('No autorizado');
    }

    // Actualizamos fecha y hora
    cita.fecha = req.body.fecha || cita.fecha;
    cita.hora = req.body.hora || cita.hora;
    
    // Si estaba cancelada, la reactivamos al reprogramar
    if (cita.estado === 'cancelada') {
        cita.estado = 'pendiente';
    }

    const citaActualizada = await cita.save();
    res.status(200).json(citaActualizada);
});

module.exports = {
    agendarCita,
    obtenerMisCitas,
    cancelarCita,     // <--- Nuevo
    reprogramarCita   // <--- Nuevo
}

