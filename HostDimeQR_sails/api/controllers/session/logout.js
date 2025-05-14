module.exports = {
  friendlyName: 'Logout',

  description: 'Cierra la sesión actual del usuario',

  exits: {
    success: {
      description: 'Sesión cerrada correctamente'
    }
  },

  fn: async function (_, exits) {
    this.req.session.destroy(err => {
      if (err) {
        return exits.success({ message: 'Error al cerrar sesión' });
      }
      return exits.success({ message: 'Sesión cerrada' });
    });
  }
};
