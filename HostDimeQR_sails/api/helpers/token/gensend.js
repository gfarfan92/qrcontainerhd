//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\token\gensend.js
 module.exports = {
  friendlyName: 'Generar y enviar token',
  description: 'Genera un token, lo guarda y lo envía por correo',

  inputs: {
    email: { type: 'string', required: true }
  },

  exits: {
    success: { description: 'Token enviado' },
    error: { description: 'Error en envío' }
  },

  fn: async function ({ email }) {
    const acceptedDomains = ['hostdime.co', 'hostdime.com.co', 'hostdime.com'];
    const domain = email.split('@')[1];

    if (!acceptedDomains.includes(domain)) {
      throw new Error('Dominio no aceptado');
    }

    const tokenGenerated = Math.floor(100000 + Math.random() * 900000).toString();

    await sails.helpers.token.store.with({ token: tokenGenerated, email });

    const html = `<p>Tu código de inicio de sesión es: <strong>${tokenGenerated}</strong></p>
                  <p>Este código es válido por 10 minutos.</p>`;

    await MicroService.Mail({
      transporter: 'hostdime.com.co',
      from: 'notifications@hostdime.com.co',
      to: email,
      subject: 'Tu código de inicio de sesión',
      html,
      replyTo: 'transactional@hostdime.com.co',
    });

    return;
  }
};

