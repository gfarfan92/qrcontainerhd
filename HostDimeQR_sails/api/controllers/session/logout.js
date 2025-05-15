module.exports = {
  friendlyName: 'Logout',

  description: 'Cierra la sesión actual del usuario',

  exits: {
    success: {
      description: 'Sesión cerrada correctamente',
    }
  },

  fn: async function (_, exits) {
    const req = this.req;
    const res = this.res;

    req.session.destroy((err) => {
      if (err) {
        sails.log.error('Error al cerrar sesión:', err);
        return res.redirect('/'); // Redirige al home aunque haya error
      }

      return res.redirect('/'); // Redirige al inicio (login, página pública, etc.)
    });
  }
};
