module.exports = {
  friendlyName: 'Cerrar sesión',

  description: 'Destruye la sesión actual del usuario',

  exits: {
    success: {
      description: 'Sesión cerrada correctamente'
    }
  },

  fn: async function (_, exits) {
    this.req.session.destroy(err => {
      if (err) {
        sails.log.error('Error al cerrar sesión:', err);
      }
    });

    return exits.success({ message: 'Sesión cerrada' });
  }
};
