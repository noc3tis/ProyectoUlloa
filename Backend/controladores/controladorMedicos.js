const asyncHandler  = require('express-async-handler');
const Medico = require('../modelos/ModeloMedico.');
const Usuario = require('../modelos/ModeloUsuario');


const getMedicos = asyncHandler(async (req, res) => {
    const medicos = await Medico.find().populate('usuario', 'nombre email');

    res.status(200).json(cita);
});

const updatePerfilMedico = asyncHandler(async (req, res) => {
    if (req.Usuario.rol !== 'medico') {
        res.status(400);
        throw new Error('Solo los usuarios con el rol de medico pueden crear un perfil profesional');

        const { especialidad, consultorio, horarioAtencion, precioConsulta, experiencia } = req.body;

        let perfilMedico = await Medico.findOne({ usuario: req.usuario.id});

        if (perfilMedico) {
            perfilMedico.especialidad = especialidad || perfilMedico.especialidad;
            perfilMedico.consultorio = consultorio || perfilMedico.consultorio;
            perfilMedico.horarioAtencion = horarioAtencion || perfilMedico.horarioAtencion;
            perfilMedico.precioConsulta = precioConsulta || perfilMedico.precioConsulta;
            perfilMedico.experiencia = experiencia || perfilMedico.experiencia;

            const perfilActualizado = await perfilMedico.save();
            res.status(200).json(perfilActualizado);
        } else {
            const nuevoPerfil = await Medico.create({
                usuario: req.usuario.id,
                especialidad,
                consultorio,
                horarioAtencion,
                precioConsulta,
                experiencia
            });
            res.status(201).json(nuevoPerfil);
        }
    }
});

module.exports = {
    getMedicos,
    updatePerfilMedico
}

