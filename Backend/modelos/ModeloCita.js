const mongoose = require('mongoose');

const citaSchema = mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Medico'
    },
    hora: {
        type: String,
        required: [true, 'Por favor selecciona una hora']
    },
    estado: {
        type: String,
        enum: ['pendiente', ' confirmada', 'cancelada', 'completada'],
        default: 'pendiente'
    },
    notas: {
        type: String,
        default: ''
    }
}, {
    timestaps: true
});

module.exports = mongoose.model('Cita', citaSchema);