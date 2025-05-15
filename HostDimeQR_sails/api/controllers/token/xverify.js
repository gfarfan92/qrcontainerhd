module.exports = {
  friendlyName: 'Verificar sesión',

  description: 'Verifica si hay una sesión activa',

  exits: {
    success: {
      description: 'Devuelve el estado de la sesión'
    }
  },

  fn: async function (_, exits) {
    const sessionUser = this.req.session.user;

    if (sessionUser) {
      return exits.success({ logeado: true, email: sessionUser.email });
    } else {
      return exits.success({ logeado: false });
    }
  }
};
