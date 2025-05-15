
module.exports = {

  friendlyName: 'Generar qr real',

  description: 'Generar QR desde helper y mostrar en vista',

  inputs: {},

  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/mostrar-qr-real'
    }
  },

  fn: async function () {

    // ✅ Obtener datos desde la sesión
    const { nombre, rol } = this.req.session.user;

    // ✅ Preparar la URL a codificar
    const url = 'https://hostdime.com';

    // ✅ Generar el QR
    const qrBase64 = await sails.helpers.generarQrBase64.with({ url });

    // ✅ Retornar a la vista con datos del usuario y del QR
    return {
      nombreUsuario: nombre,
      rol,
      qrBase64,
      urlFinal: url
    };
  }
};

