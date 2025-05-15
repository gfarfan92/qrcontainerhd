// api/controllers/demo/view-with-data.js

module.exports = {

  friendlyName: 'View with data',

  description: 'Muestra una vista con datos desde sesión.',

  inputs: {},

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/view-with-data'
    }
  },

  fn: async function () {

    // ✅ Obtener datos de sesión
    const usuario = this.req.session.user || { nombre: 'Invitado', rol: 'Usuario' };

    // ✅ Pasar datos a la vista
    return {
      nombreUsuario: usuario.nombre,
      rol: usuario.rol
    };
  }

};
