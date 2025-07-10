//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\controllers\qr\generadorqr.js


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
      let shortUrl = url;

      // Si el acortador está activado, llamamos al helper
      if (short === 'true') {

        // ESTA ES LA FORMA CORRECTA Y ROBUSTA
        // Envolvemos la llamada que puede fallar en su propio try/catch
        try {
          shortUrl = await sails.helpers.url.acortador.with({ url, customSlug });
        } catch (err) {
          // Si el helper falla, revisamos aquí por qué
          if (err.exit === 'slugEnUso') {
            sails.log.warn('⚠️ Slug personalizado en uso:', customSlug);

            // Devolvemos la respuesta de error al frontend y SALIMOS de la función
            return exits.success({
              success: false,
              errcustom: 'slugEnUso'
            });
          }

          // Si fue otro tipo de error, lo relanzamos para que lo capture el catch de abajo
          throw err;
        }
      }

      // Este código SÓLO se ejecutará si el acortador tuvo éxito (o no se usó)
      const qrResult = await sails.helpers.qr.generadorqr.with({
        shortUrl,
        style,
        size,
        type,
      });

      // Enviamos la respuesta de éxito final
      return exits.success({
        success: true,
        shortUrl,
        qrImage: qrResult.qrImage
      });

    } catch (error) {
      // Este catch general atrapa todos los demás errores inesperados
      sails.log.error("❌ Error en controlador qr/generadorqr:", error);
      return exits.success({
        success: false,
        errcustom: 'errorDesconocido'
      });
    }
  }
}