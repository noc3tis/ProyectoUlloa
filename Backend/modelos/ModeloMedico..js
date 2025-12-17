const mongoose = require('mongoose');

const medicoSchema = mongoose.Schema({
    // Vinculamos este perfil médico a una cuenta de usuario real (Login)
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    nombre: {
        type: String,
        required: true
    },
    especialidad: {
        type: String,
        required: [true, 'Por favor indica la especialidad']
    },
    consultorio: {
        type: String,
        required: [true, 'Número de consultorio o dirección']
    },
    // No se uso
    horarioAtencion: {
        inicio: String,
        fin: String
    },
    precioConsulta: {
        type: Number,
        required: true
    },
    experiencia: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Medico', medicoSchema);