const asyncHandler  = require('express-async-handler'); // Middleware para manejar errores en promesas sin tanto try-catch sucio
const Cita = require('../modelos/ModeloCita');
const sendEmail = require('../utils/Email');
const Medico = require('../modelos/ModeloMedico.');

// --- Lógica para Crear Cita (CRUD: Create) ---
const agendarCita = asyncHandler(async (req, res) => {
    const { medico, fecha, notas } = req.body;

    // Si faltan datos, rechazamos la petición antes de tocar la BD
    if (!medico || !fecha) {
        res.status(400);
        throw new Error('Por favor rellena los campos necesarios');
    }

    // Creamos el documento en Mongo relacionándolo con el usuario autenticado
    const cita = await Cita.create({
        paciente: req.usuario.id, // Usamos el ID que el middleware ya nos inyectó
        medico,
        fecha,
        notas,
        estado: 'pendiente'
    });

    // --- Extra: Envío de correo de confirmación ---
    try {
        // Buscamos al médico para poner su nombre en el correo
        const datosMedico = await Medico.findById(medico);
        
        const nombreMedico = datosMedico ? datosMedico.nombre : 'Por asignar';
        const ubicacionMedico = datosMedico ? datosMedico.consultorio : 'Consultorio pendiente';

        // Formateamos la fecha para que el usuario la entienda (UX)
        const fechaLegible = new Date(fecha).toLocaleString('es-MX', { 
            timeZone: 'America/Mexico_City', 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });

        // Plantilla HTML simple para el correo 
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

        // Mandamos el mail usando el utilitario que configuramos (Nodemailer/SendGrid)
        await sendEmail({
            email: req.usuario.email,
            subject: `Confirmación de Cita con Dr. ${nombreMedico}`,
            message: `Tu cita es el ${fechaLegible} con el Dr. ${nombreMedico}`,
            html: mensajeHTML
        });

    } catch (error) {
        // Si falla el correo, no tiramos el server, solo avisamos en consola
        console.log("No se pudo enviar el correo de confirmación:", error.message);
    }

    res.status(201).json(cita);
});

// --- Lógica para Leer Citas (CRUD: Read) ---
const obtenerMisCitas = asyncHandler(async (req, res) => {
    
    // Aquí usamos las relaciones en Mongo:
    // Usamos .populate() para traernos los datos del médico (nombre, especialidad)
    const citas = await Cita.find({ paciente: req.usuario.id })
        .populate('medico', 'nombre especialidad consultorio') 
        .sort({ fecha: 1 }); // Ordenadas por fecha para mejor UX

    res.status(200).json(citas);
    
});

// --- Lógica para Borrar (CRUD: Delete) ---
const cancelarCita = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
        res.status(404);
        throw new Error('Cita no encontrada');
    }

    // Seguridad: Verificamos que quien cancela sea el dueño de la cita o el médico encargado
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

// --- Lógica para Actualizar (CRUD: Update) ---
const reprogramarCita = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
        res.status(404);
        throw new Error('Cita no encontrada');
    }

    // Validación de permisos nuevamente (Seguridad)
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

    // Actualizamos y pedimos que nos regrese el documento nuevo (new: true)
    let citaActualizada = await Cita.findByIdAndUpdate(
        req.params.id,
        { fecha },
        { new: true } 
    );

    // El frontend recibe los nombres completos
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