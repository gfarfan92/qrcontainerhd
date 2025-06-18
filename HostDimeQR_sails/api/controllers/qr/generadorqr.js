// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\qr\generadorqr.js

module.exports = {
  friendlyName: 'Crear qr',
  description: 'Genera un código QR: acorta la URL y aplica estilo.',

  inputs: {
    url: { type: 'string', required: true },
    style: { type: 'number', required: true },
    size: { type: 'number', required: true },
    type: { type: 'string', required: true },
      short: { type: 'string', required: true },//on / off
    customSlug: { type: 'string', required: false }
  },

  exits: {
    success: { description: 'QR generado exitosamente.' },
    error: { description: 'Error al generar el QR.' }
  },

  fn: async function (inputs, exits) {
    sails.log.info('?? Inputs recibidos en cqr:', inputs);

    const { style, size, type, url, customSlug,short } = inputs;


    try {
      // 1. Intentar eliminar si hay customSlug
      if (customSlug) {
        try {
          await sails.helpers.url.eliminar.with({ customSlug });
        } catch (deleteErr) {
          const cause = deleteErr.cause && deleteErr.cause.status;
          if (cause === 404) {
            sails.log.warn(`Slug "${customSlug}" no existe, se omitió la eliminación.`);s
          } else {
            throw deleteErr;
          }
        }
      }

      // 2. Generar URL acortada
let shortUrl;

if (short === 'on') {
  try {
    shortUrl = await sails.helpers.url.acortador.with({ url, customSlug });
  } catch (error) {
    sails.log.error('? Error al acortar URL:', error);
    return exits.error({ message: 'No se pudo acortar la URL', error });
  }
} else {
  shortUrl = url;
}


      // 3. Generar QR con esa URL
      const response = await sails.helpers.qr.generadorqr.with({
        shortUrl,
        style,
        size,
        type
      });

      return exits.success(response);

    } catch (error) {
      sails.log.error("? Error en controlador qr/cqr:", error);
      return exits.error({ message: 'Error en controlador qr/cqr', error: error.message });
    }
  }
};
