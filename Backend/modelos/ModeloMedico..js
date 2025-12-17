const mongoose = require('mongoose');

const medicoSchema = mongoose.Schema({
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
        required: [true, 'Por favor indcia la especialidad']
    },
    consultorio: {
        type: String,
        required: [true, 'Número de consultorio o dirección']
    },
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