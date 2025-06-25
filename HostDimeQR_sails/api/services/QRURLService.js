// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\hoy\qr-hostdime\HostDimeQR_sails\api\services\QRURLService.js
const _ = require('lodash');

/**
 * @module services/QRURLService
 * @desc Servicio global para generar URLs cortas y códigos QR.
 * Orquesta helpers: acortador y generadorQR.
 */
module.exports = {
  /**
   * Punto de entrada genérico: recibe { cmd, model, payload }
   * @param {{cmd: string, model: string, payload: object}} item
   */
  exec: async (item) => {
    const { cmd, payload } = item;

    if (!payload || !payload.url) {
      return { success: false, error: 'Payload inválido. Se requiere al menos .url' };
    }

    switch (cmd) {
      case 'shortURL':
        return await QRURLService.shortURL(payload);

      case 'generarQR':
        return await QRURLService.generateQR(payload);

      default:
        return { success: false, error: `Comando desconocido: ${cmd}` };
    }
  },

  /**
   * Genera una URL corta usando el helper de acortador.
   * @param {{url: string, customSlug?: string}} payload
   */
  shortURL: async (payload) => {
    try {
      const url = payload.url;
      const customSlug = payload.customSlug;
      const short = payload.short;
      //let {short, url, customSlug} = payload;

      let finalUrl = url;

      // 1. Si se quiere acortar y viene customSlug, eliminar primero
      if (short === 'on' && customSlug) {
        try {
          await sails.helpers.url.eliminar.with({ customSlug });
        } catch (deleteErr) {
          const statusCode = deleteErr?.cause?.status || deleteErr.statusCode;
          if (statusCode === 404) {
            sails.log.warn(`⚠️ Slug "${customSlug}" no existía, se ignoró la eliminación.`);
          } else {
            throw deleteErr; // otros errores sí deben lanzarse
          }
        }
      }

      // 2. Si se quiere acortar, generar shortUrl
      if (short === 'on') {
        try {
          const shortUrl = await sails.helpers.url.acortador.with({
            url,
            customSlug: customSlug || undefined,
          });

          return {
            success: true,
            response: {
              shortUrl, // string directo DESDE helper
            },
          };
        } catch (error) {
          sails.log.error('❌ Error al acortar URL:', error);
          return {
            success: false,
            error: 'Error generando URL corta',
            details: error.message,
          };
        }
      }

      // 3. Si no se quiero acortar
      return {
        success: true,
        response: {
          shortUrl: url,
        },
      };

    } catch (error) {
      sails.log.error("❌ Error general en QRURLService.shortURL:", error);
      return {
        success: false,
        error: 'Error inesperado en shortURL',
        details: error.message,
      };
    }
  },
generateQR: async (payload) => {
  try {
    if (!payload || typeof payload !== 'object' || !payload.options || !payload.options.data) {
      throw new Error('Payload inválido. Debe incluir al menos "options.data".');
    }

    // Llamar al helper directamente
    const result = await sails.helpers.qr.servicegenerador.with({
      options: payload.options,
      formato: payload.formato || 'png'
    });

    return {
      success: true,
      response: {
        qrImage: `data:${result.mime};base64,${result.base64}`
      }
    };

  } catch (err) {
    sails.log.error('❌ Error en QRURLService.generateQR:', err);
    return {
      success: false,
      error: 'Error generando QR',
      details: err.message
    };
  }
}
}
