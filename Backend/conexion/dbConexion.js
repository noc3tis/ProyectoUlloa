const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Aquí hacemos la conexión a Mongo usando la variable de entorno
        // para no exponer las credenciales en el código 
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        // Si falla la conexión, mostramos el error y matamos el proceso
        // para no dejar el servidor colgado.
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;