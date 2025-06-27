// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\QRURLService.js
const _ = require('lodash');
const fs = require("fs").promises; // ¡CORRECCIÓN: Aseguramos que usamos las promesas de fs!
const os = require("os");
const path = require("path");

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
      const { url, customSlug } = payload;

      // ¡CORRECCIÓN: El helper es modifySlugWithRandom!
      const finalCustomSlug = await QRURLService._getProcessedCustomSlug(customSlug);

      const shortUrl = await sails.helpers.url.acortador.with({
        url,
        customSlug: finalCustomSlug || undefined,
      });

      return {
        success: true,
        response: {
          shortUrl,
          customSlugUsed: finalCustomSlug
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
  },

  /**
   * @private
   * Función auxiliar para procesar el customSlug:
   * - Si customSlug existe, le añade un número random.
   * - Si customSlug no existe, devuelve undefined.
   * @param {string | undefined} customSlug El slug recibido en el payload.
   * @returns {Promise<string | undefined>} El slug procesado o undefined.
   */
  _getProcessedCustomSlug: async (customSlug) => {
    if (customSlug) {
      // ¡CORRECCIÓN: El helper es modifySlugWithRandom!
      const processedSlug = await sails.helpers.url.modify.with({
        customSlug: customSlug
      });
      sails.log.info(`💡 Slug original: "${customSlug}", Slug final generado con random: "${processedSlug}"`);
      return processedSlug;
    } else {
      sails.log.info('🤔 No se proporcionó customSlug. Se dejará que Shlink genere uno automáticamente.');
      return undefined;
    }
  },

  generateQR: async (payload) => {
    let tempFilePath; // Declarada aquí para el bloque finally
    try {
      if (payload.url && !payload.options) {
        const type = payload.format || 'svg';
        const size = payload.size || 1200;
        const style = 2;

        let shortUrl = payload.url;
        if (payload.short === true || payload.short === 'on' || payload.short === 'true') {
          const finalCustomSlugForQR = await QRURLService._getProcessedCustomSlug(payload.customSlug);
          shortUrl = await sails.helpers.url.acortador.with({
            url: payload.url,
            customSlug: finalCustomSlugForQR || undefined,
          });
        }

        // El helper generadorqr ahora devuelve { qrImage: base64String, tempFilePath: 'ruta/al/archivo/temporal' }
        // ¡CORRECCIÓN: El helper generadorqr debe devolver el tempFilePath!
        const qrResult = await sails.helpers.qr.generadorqr.with({
          shortUrl,
          type,
          size,
          style
        });

        // Aseguramos que tenemos la ruta temporal del archivo generado por generadorqr
        // ¡CORRECCIÓN: tempFilePath se obtiene directamente del resultado del helper generadorqr!
        tempFilePath = qrResult.tempFilePath;

        if (!tempFilePath || typeof tempFilePath !== 'string') {
          throw new Error('El helper generadorqr no devolvió una ruta de archivo temporal válida.');
        }

        // 2. Subir a MinIO
        // Definimos un nombre de objeto para MinIO, por ejemplo, usando la fecha y un random para unicidad
        const uniqueFileName = path.basename(tempFilePath); // Obtiene el nombre del archivo del path temporal
        const objectName = `qrs/${uniqueFileName}`; // Carpeta 'qrs' en el bucket de MinIO

        // ¡CORRECCIÓN: La llamada al helper de MinIO es correcta!
        const qrImageLink = await sails.helpers.url.uploadtominio.with({
          localFilePath: tempFilePath,
          objectName: objectName
        });
        sails.log.info(`QR subido a MinIO: ${qrImageLink}`);

        return {
          success: true,
          response: {
            qrLink: shortUrl,
            qrImageLink: qrImageLink,
            qrImage: qrResult.qrImage, // La imagen en base64 si aún se necesita en la respuesta
          }
        };
      }

      // Caso detallado: viene payload.options (si este caso también generará QR, la lógica de MinIO debe duplicarse)
      if (!payload.options || !payload.options.data) {
        throw new Error('Payload inválido. Debe incluir al menos "options.data".');
      }

      const result = await sails.helpers.qr.servicegenerador.with({
        options: payload.options,
        format: payload.format || 'svg'
      });

      // ¡CORRECCIÓN: Lógica para el caso detallado si también necesita MinIO!
      let qrImageLinkFromMinio = "";
      let tempFilePathDetailed; // Temporal para este bloque
      try {
        if (result.base64 && result.mime) {
          const base64Image = result.base64;
          const fileExtension = result.mime.split('/')[1] || 'png'; // Asumir png si no se detecta
          const uniqueFileName = `qr_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
          tempFilePathDetailed = path.join(os.tmpdir(), uniqueFileName);

          await fs.writeFile(tempFilePathDetailed, Buffer.from(base64Image, 'base64'));
          sails.log.info(`Archivo QR detallado temporal guardado en: ${tempFilePathDetailed}`);

          const objectNameDetailed = `qrs/${uniqueFileName}`;
          qrImageLinkFromMinio = await sails.helpers.url.uploadToMinio.with({
            localFilePath: tempFilePathDetailed,
            objectName: objectNameDetailed
          });
          sails.log.info(`QR detallado subido a MinIO: ${qrImageLinkFromMinio}`);
        }
      } catch (uploadErr) {
        sails.log.error('❌ Error subiendo QR detallado a MinIO:', uploadErr);
        // Decide si quieres fallar la solicitud o solo omitir el link de MinIO
      } finally {
        if (tempFilePathDetailed) {
          try {
            await fs.unlink(tempFilePathDetailed);
            sails.log.info(`Archivo temporal detallado eliminado: ${tempFilePathDetailed}`);
          } catch (unlinkErr) {
            sails.log.warn(`No se pudo eliminar el archivo temporal detallado: ${tempFilePathDetailed}`, unlinkErr);
          }
        }
      }
      // FIN Lógica para el caso detallado

      return {
        success: true,
        response: {
          qrImageLink: qrImageLinkFromMinio, // Aquí irá la URL de MinIO si se subió
          qrImage: `data:${result.mime};base64,${result.base64}`,
        }
      };

    } catch (err) {
      sails.log.error('❌ Error en QRURLService.generateQR:', err);
      return {
        success: false,
        error: 'Error generando QR',
        details: err.message
      };
    } finally {
      // ¡CORRECCIÓN: La limpieza de tempFilePath debe estar aquí para el primer caso!
      if (tempFilePath) {
        try {
          await fs.unlink(tempFilePath);
          sails.log.info(`Archivo temporal eliminado: ${tempFilePath}`);
        } catch (unlinkErr) {
          sails.log.warn(`No se pudo eliminar el archivo temporal: ${tempFilePath}`, unlinkErr);
        }
      }
    }
  }
};