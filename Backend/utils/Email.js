const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Configuramos el transporte (en este caso Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER, // Credenciales seguras en .env
      pass: process.env.EMAIL_PASS, 
    },
  });

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.EMAIL_USER}>`,
    to: options.email, 
    subject: options.subject,
    text: options.message, 
    html: options.html // Soporte para HTML bonito
  };

  const info = await transporter.sendMail(message);

};

module.exports = sendEmail;