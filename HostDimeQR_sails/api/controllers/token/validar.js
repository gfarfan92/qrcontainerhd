module.exports = {
  friendlyName: 'Validar token',

  description: 'Valida el token y crea una sesión',

  inputs: {
    email: { type: 'string', required: true },
    token: { type: 'string', required: true }
  },

  exits: {
    success: {
      description: 'Token válido, sesión creada'
    },
    error: {
      description: 'Token inválido o expirado'
    }
  },

  fn: async function (inputs, exits) {
    const { email, token } = inputs;

    const tokenStore = sails.config.custom.tokenStore || {};

    const data = tokenStore[email];

    if (!data) {
      return exits.error({ message: 'Token no encontrado. Solicita uno nuevo.' });
    }

    if (Date.now() > data.expiresAt) {
      return exits.error({ message: 'Token expirado.' });
    }

    if (data.token !== token) {
      return exits.error({ message: 'Token incorrecto.' });
    }

    // Crear la sesión
    this.req.session.user = { email };

    return exits.success({ message: 'Inicio de sesión exitoso' });
  }
};
