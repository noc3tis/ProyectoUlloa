const asyncHandler  = require('express-async-handler');
const Cita = require('../modelos/ModeloCita');
const sendEmail = require('../utils/Email');
const Medico = require('../modelos/ModeloMedico.');
const agendarCita = asyncHandler(async (req, res) => {
    const { medico, fecha, notas } = req.body;

    if (!medico || !fecha) {
        res.status(400);
        throw new Error('Por favor rellena los campos necesarios');
    }

    const cita = await Cita.create({
        paciente: req.usuario.id,
        medico,
        fecha,
        notas,
        estado: 'pendiente'
    });


    try {
        
        const datosMedico = await Medico.findById(medico);
        
        const nombreMedico = datosMedico ? datosMedico.nombre : 'Por asignar';
        const ubicacionMedico = datosMedico ? datosMedico.consultorio : 'Consultorio pendiente';

       
        const fechaLegible = new Date(fecha).toLocaleString('es-MX', { 
            timeZone: 'America/Mexico_City', 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        const mensajeHTML = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fdfdfd;">
                <h2 style="color: #2c3e50; text-align: center;">¡Cita Confirmada! ✅</h2>
                <p>Hola <strong>${req.usuario.nombre}</strong>,</p>
                <p>Tu cita ha sido registrada exitosamente en nuestro sistema.</p>
                
                <div style="background-color: #f0f8ff; padding: 15px; margin: 20px 0; border-left: 5px solid #007bff; border-radius: 4px;">
                    <p style="margin: 5px 0;"><strong> Fecha y Hora:</strong> ${fechaLegible}</p>
                    <p style="margin: 5px 0;"><strong> Médico:</strong> Dr. ${nombreMedico}</p> 
                    <p style="margin: 5px 0;"><strong> Ubicación:</strong> ${ubicacionMedico}</p>
                    <p style="margin: 5px 0;"><strong> Notas:</strong> ${notas || 'Ninguna'}</p>
                </div>

                <p>Por favor llega 10 minutos antes. Si necesitas cancelar, puedes hacerlo desde tu panel.</p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #777; text-align: center;">Hospital Medical Reservation - Torreón, Coahuila</p>
            </div>
        `;

        await sendEmail({
            email: req.usuario.email,
            subject: `Confirmación de Cita con Dr. ${nombreMedico}`,
            message: `Tu cita es el ${fechaLegible} con el Dr. ${nombreMedico}`,
            html: mensajeHTML
        });

    } catch (error) {
        console.log("No se pudo enviar el correo de confirmación:", error.message);
    }

    res.status(201).json(cita);
});

const obtenerMisCitas = asyncHandler(async (req, res) => {
    
    const citas = await Cita.find({ paciente: req.usuario.id })
        .populate('medico', 'nombre especialidad consultorio') 
        .sort({ fecha: 1 }); // Ordenadas por fecha

    res.status(200).json(citas);
    
});

const cancelarCita = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
        res.status(404);
        throw new Error('Cita no encontrada');
    }

    const esPaciente = cita.paciente.toString() === req.usuario.id;

    const perfilMedico = await Medico.findOne({ usuario: req.usuario.id });
    const esMedico = perfilMedico && cita.medico.toString() === perfilMedico.id;

    if (!esPaciente && !esMedico) {
        res.status(401);
        throw new Error('No autorizado para cancelar esta cita');
    }

    await cita.deleteOne({ _id: req.params.id });

    res.status(200).json({ id: req.params.id });
});

const reprogramarCita = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
        res.status(404);
        throw new Error('Cita no encontrada');
    }


    const esPaciente = cita.paciente.toString() === req.usuario.id;

    const perfilMedico = await Medico.findOne({ usuario: req.usuario.id });
    
    const esMedico = perfilMedico && cita.medico.toString() === perfilMedico.id;

    if (!esPaciente && !esMedico) {
        res.status(401);
        throw new Error('No autorizado para reprogramar esta cita');
    }

    const { fecha } = req.body;

    if (!fecha) {
        res.status(400);
        throw new Error('Debes proporcionar una nueva fecha');
    }

    let citaActualizada = await Cita.findByIdAndUpdate(
        req.params.id,
        { fecha },
        { new: true } 
    );

    citaActualizada = await citaActualizada.populate([
        { path: 'paciente', select: 'nombre email' },
        { path: 'medico', select: 'nombre especialidad consultorio' }
    ]);

    res.status(200).json(citaActualizada);
});

const getCitasDoctor = asyncHandler(async (req, res) => {
    const perfilMedico = await Medico.findOne({ usuario: req.usuario._id });

    if (!perfilMedico) {
        res.status(404);
        throw new Error('No se encontró un perfil médico asociado a este usuario.');
    }

    console.log("Usuario ID (Login):", req.usuario._id);
    console.log("Médico ID (Perfil):", perfilMedico._id); 

    const citas = await Cita.find({ medico: perfilMedico._id })
        .populate('paciente', 'nombre email')
        .sort({ fecha: 1 });

    res.status(200).json(citas);
});

module.exports = {
    agendarCita,
    obtenerMisCitas,
    cancelarCita,     
    reprogramarCita,   
    getCitasDoctor
}

