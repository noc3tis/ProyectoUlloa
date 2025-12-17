const mongoose = require('mongoose');

const citaSchema = mongoose.Schema({
    // Relación con el Paciente (Usuario)
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario' // Esto permite usar .populate('paciente') después
    },
    // Relación con el Médico
    medico: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Medico' 
    },
    fecha: {
        type: Date,
        required: [true, 'Por favor selecciona una fecha y hora']
    },
    // Estado de la cita para control de flujo, al final no se uso
    estado: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada', 'completada'], 
        default: 'pendiente'
    },
    notas: {
        type: String,
        default: ''
    }
}, {
    timestamps: true // Crea automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Cita', citaSchema);