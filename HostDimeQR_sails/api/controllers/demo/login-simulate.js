// api/controllers/demo/login-simulate.js

module.exports = {

  friendlyName: 'Login simulate',

  description: 'Simula un login y redirige a la vista con datos.',

  inputs: {},

  exits: {
    success: {
      description: 'Redirección exitosa después del login simulado.'
    }
  },

  fn: async function () {

    // ✅ Guardar en la sesión (simulando login)
    this.req.session.user = { 
      email: "german.f@hostdime.co", 
      nombre: "Germán", 
      rol: "Administrador"
    };

    // ✅ Redirigir a la vista con datos (puedes cambiar la ruta según tu acción real)
    return this.res.redirect('/demo/generar-qr-real');
  }

};
