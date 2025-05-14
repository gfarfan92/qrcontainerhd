//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\token\get-token.js


module.exports = {
  friendlyName: 'Verificar dominio',
  description: 'Verificación de dominio Hostdime',

  inputs: {
    email: { type: 'string', required: true },
  },

  exits: {
    success: { description: 'Se envió el token al correo' },
    error: { description: 'Error al iniciar sesión' }
  },

  fn: async function (inputs, exits) {
    const { email } = inputs;

    // Verificar que el correo es válido
    if (!email || !/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+(com|co|org)$/i.test(email)) {
      return exits.error({ message: 'Correo no válido' });
    }

    // Verifico si el dominio es aceptado
    const acceptedDomains = ['hostdime.co', 'hostdime.com.co', 'hostdime.com'];
    const domain = email.split('@')[1];

    if (!acceptedDomains.includes(domain)) {
      return exits.error({ message: 'Dominio no aceptado' });
    }

    try {
      // Generar el token de sesión
      const tokenGenerated = Math.floor(100000 + Math.random() * 900000).toString();

      // Almacenar el token temporalmente (por ejemplo, en memoria o base de datos)
      await sails.helpers.token.store.with({
        token: tokenGenerated,
        email
      });

      // Enviar el correo con el token
      const html = `<p>Tu código de inicio de sesión es: <strong>${tokenGenerated}</strong></p>
                    <p>Este código es válido por 10 minutos.</p>`;
      const dataPost = {
        transporter: 'hostdime.com.co',
        from: 'notifications@hostdime.com.co',
        to: email,
        subject: 'Tu código de inicio de sesión',
        html,
        replyTo: 'transactional@hostdime.com.co',
      };

      await MicroService.Mail(dataPost);

      return exits.success({ message: 'Se envió el token a tu correo' });
    } catch (error) {
      sails.log.error('Error al generar token o enviar correo:', error);
      return exits.error({ message: 'Error al generar el token o enviar el correo' });
    }
  }
};
