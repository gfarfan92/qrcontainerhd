// api/controllers/qr/cqr.js
module.exports = {
  friendlyName: 'Crear qr',
  description: 'Genera un código QR: acorta la URL y aplica estilo.',

  inputs: {
    url: { type: 'string', required: true },
    style: { type: 'number', required: true },
    size: { type: 'number', required: true },
    type: { type: 'string', required: true },
    customSlug: { type: 'string', required: false }
  },

  exits: {
    success: { description: 'QR generado exitosamente.' },
    error: { description: 'Error al generar el QR.' }
  },

  fn: async function (inputs, exits) {

    try {
      const { url, style, size, type, customSlug } = inputs;

      const response = await sails.helpers.qr.generadorqrh.with({
        url,
        style,
        size,
        type,
        customSlug
      });
      return exits.success(response)
    } catch (error) {
      sails.log.debug("error haasta controlador qr/cqr",error);
      return exits.error({message:'error en controler qr/cqr', error:error.message});
    }
  }
};
