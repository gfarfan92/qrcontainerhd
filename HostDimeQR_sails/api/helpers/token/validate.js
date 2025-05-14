const tokenStore = sails.config.custom.tokenStore || (sails.config.custom.tokenStore = {});

module.exports = {
  friendlyName: 'Token validate',
  description: 'Valida el token temporalmente en memoria',
  inputs: {
    token: { type: "string", required: true }, 
    email: { type: "string", required: true }
  },

  exits: {
    success: { description: 'Token válido' },
    error:   { description: 'Token inválido o expirado' }
  },

  fn: async function ({ token, email }, exits) {
    try {
      const data = tokenStore[email];
      if (!data) {
        return exits.error({ message: "No hay token guardado para ese correo" });
      }

      const isValid = data.token === token && Date.now() < data.expiresAt;
      if (isValid) {
        delete tokenStore[email]; // ✅ eliminar para que no se reutilice
        return exits.success({ message: "Token válido" });
      } else {
        return exits.error({ message: "Token inválido o expirado" });
      }
    } catch (error) {
      return exits.error({ message: "Error interno", error });
    }
  }
};
