// api/controllers/url/cacortador.js
module.exports = {

  friendlyName: 'Acortar URL (desde controller)',

  description: 'Controlador para acortar una URL usando el helper.',

  inputs: {
    url: {
      type: 'string',
      required: true
    },
    customSlug: {
      type: 'string',
      required: false
    }
  },

  exits: {
    success: {
      description: 'URL acortada exitosamente.'
    },
    error: {
      description: 'Error al acortar la URL.',
      responseType: 'serverError'
    }
  },

  fn: async function (inputs, exits) {
    const { url, customSlug } = inputs;

    try {
      if (customSlug) {
        try {
          // Intentamos eliminar el slug previo
          await sails.helpers.url.eliminarurl.with({ customSlug });
        } catch (deleteErr) {
          // Si el helper devolvió 404, lo ignoramos
          const cause = deleteErr.cause && deleteErr.cause.status;
          if (cause === 404) {
            sails.log.warn(`Slug "${customSlug}" no existe, se omitió la eliminación.`);
          } else {
            // Cualquier otro error, lo propagamos
            throw deleteErr;
          }
        }
      }

      // Ahora creamos el nuevo shortUrl
      const shortUrl = await sails.helpers.url.hacortador.with({ url, customSlug });
      return exits.success({ shortUrl });

    } catch (err) {
      // Asegúrate de pasar un Error real al exit
      sails.log.error('Error en cacortador:', err);
      return exits.error(err instanceof Error ? err : new Error(err.message || err));
    }
  }
};
