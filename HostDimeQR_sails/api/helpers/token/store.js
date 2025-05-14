//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\token\token-store.js


const tokenStore = sails.config.custom.tokenStore || (sails.config.custom.tokenStore = {});

module.exports = {
  friendlyName: 'Token store',

  description: 'Guarda el token temporalmente en memoria',

  inputs: {
  token: { type: "string", required: true }, 
  email: { type: "string", required: true }
},

  exits: {
    success: {
      description: 'Se guardó el token correctamente'
    },
    error: {
      description: 'Error al guardar el token'
    }
  },

  fn: async function (inputs, exits) {
    const { token, email } = inputs;
    try {
      tokenStore[email] = {
        token,
        expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutos
      };
      return exits.success({ message: 'Token guardado correctamente',tokenStore });
    } catch (error) {
      return exits.error(error);
    }
  }
};
