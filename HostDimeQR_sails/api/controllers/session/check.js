// api/controllers/session/check.js
module.exports = {
  friendlyName: 'Check session',

  description: 'Verifica si hay sesión activa',

  exits: {
    success: { description: 'Sesión encontrada' },
    notLoggedIn: { description: 'No hay sesión activa' }
  },

  fn: async function (inputs, exits) {
    if (this.req.session.user) {
      return exits.success({ message: 'Sesión activa', user: this.req.session.user });
    } else {
      return exits.notLoggedIn({ message: 'No hay sesión activa' });
    }
  }
};
