module.exports = {
  friendlyName: 'Crear qr',
  description: 'Genera un código QR: acorta la URL y aplica estilo.',

  inputs: {
    url: { type: 'string', required: true },
    style: { type: 'number', required: true },
    size: { type: 'number', required: true },
    type: { type: 'string', required: true },
    short: { type: 'string', required: true },
    customSlug: { type: 'string', required: false }
  },

  exits: {
    success: { description: 'QR generado exitosamente.' },
    error: { description: 'Error al generar el QR.' }
  },

  fn: async function (inputs, exits) {
    sails.log.info('📦 Inputs recibidos en cqr:', inputs);
    const { style, size, type, url, customSlug, short } = inputs;

    try {

       // 1. Intentar eliminar si hay customSlug
      /* if (customSlug) {
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
       }*/
      let shortUrl = url;

      if (short === true || short === 'true' || short === 'on') {
        try {
          shortUrl = await sails.helpers.url.acortador.with({ url, customSlug });
        } catch (err) {
          return exits.error(err); // ← deja que pase el objeto errcustom
        }
      }

      const response = await sails.helpers.qr.generadorqr.with({
        shortUrl,
        style,
        size,
        type
      });

      return exits.success(response);

    } catch (error) {
      sails.log.error("❌ Error en controlador qr/cqr:", error);
      return exits.error({
        message: 'Error general',
        errcustom: 'errorDesconocido'
      });
    }
  }
};
