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
    fecha: {
        type: Date,
        required: [true, 'Por favor selecciona una fecha y hora']
    },
    
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
    timestamps: true 
});

module.exports = mongoose.model('Cita', citaSchema);