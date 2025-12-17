const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor agrega un nombre']
    },
    email: {
        type: String,
        required: [true, 'Por favor agrega un email'],
        unique: true // Evita duplicados a nivel de base de datos
    },
    password: {
        type: String,
        required: [true, 'Por favor agrega una contraseña']
    },
    // Control de roles simple 
    rol: {
        type: String,
        enum: ['paciente', 'medico'],
        default: 'paciente'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);