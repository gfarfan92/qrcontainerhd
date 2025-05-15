module.exports = {
  friendlyName: 'Validar token',

  description: 'Valida el token y crea una sesión',

  inputs: {
    email: { type: 'string', required: true },
    token: { type: 'string', required: true }
  },

  exits: {
    success: {
  
   description: 'Token inválido o expirado',
    },
    invalidToken: {
      description: 'Token inválido o expirado',
      responseType: 'badRequest'
    },
    error: {
      description: 'Error inesperado',
      responseType: 'badRequest'
    }
  },

  fn: async function (inputs, exits) {
    try {
      console.log('Entró a validar token:', inputs);

      const { email, token } = inputs;

      const tokenStore = sails.config.custom.tokenStore || {};

      const data = tokenStore[email];

      if (!data) {
        console.log('Token no encontrado');
        return exits.invalidToken({ message: 'Token no encontrado. Solicita uno nuevo.' });
      }

      if (Date.now() > data.expiresAt) {
        console.log('Token expirado');
        return exits.invalidToken({ message: 'Token expirado.' });
      }

      if (data.token !== token) {
        console.log('Token incorrecto');
        return exits.invalidToken({ message: 'Token incorrecto.' });
      }

      // Token válido
      this.req.session.user = { email };
      console.log('Sesión creada para:', email);

 return this.res.redirect('/session/homepage');

    } catch (err) {
      console.error('Error en validar token:', err);
      return exits.error({ message: 'Error inesperado', details: err.message });
    }
  }
};
