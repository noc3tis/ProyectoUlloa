const asyncHandler = require('express-async-handler');
const Medico = require('../modelos/ModeloMedico.'); 
const Usuario = require('../modelos/ModeloUsuario');

const getMedicos = asyncHandler(async (req, res) => {
    const medicos = await Medico.find().populate('usuario', 'nombre email');

    res.status(200).json(medicos);
});

const updatePerfilMedico = asyncHandler(async (req, res) => {
    
    if (!req.usuario) {
        res.status(401);
        throw new Error('Usuario no autenticado');
    }

    if (req.usuario.rol !== 'medico') {
        res.status(403);
        throw new Error('Acción no válida: Solo los médicos tienen perfil profesional');
    } 

    const { especialidad, consultorio, horarioAtencion, precioConsulta, experiencia } = req.body;

    let perfilMedico = await Medico.findOne({ usuario: req.usuario.id });

    if (perfilMedico) {
        perfilMedico.nombre = req.usuario.nombre;
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
            nombre: req.usuario.nombre,
            especialidad,
            consultorio,
            horarioAtencion,
            precioConsulta,
            experiencia
        });
        res.status(201).json(nuevoPerfil);
    }
});

const getMiPerfil = asyncHandler(async (req, res) => {
    const perfil = await Medico.findOne({ usuario: req.usuario._id });
    
    if (!perfil) {
        return res.status(200).json(null);
    }

    res.status(200).json(perfil);
});

module.exports = {
    getMedicos,
    updatePerfilMedico,
    getMiPerfil 
}