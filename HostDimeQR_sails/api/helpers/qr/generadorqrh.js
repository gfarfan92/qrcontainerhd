//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\qr\generadorqrh.js

const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");

module.exports = {

  friendlyName: 'Crear qr',
  description: 'Genera un código QR con estilo personalizado.',

inputs: {
  url: { type: 'string', required: true },
  style: { type: 'number', required: true },
  size: { type: 'number', required: true },
  type: { type: 'string', required: true },
  customSlug: { type: 'string', required: false }
},


  exits: {
    success: { description: 'QR exitoso.' },
    error:   { description: 'Ocurrió un error al crear QR.' }
  },

  fn: async function ({ url, style, size, type, customSlug }, exits) {
    try {
      // 1) Acortar la URL si se especifica slug
      let finalUrl = url;
      if (customSlug) {
      finalUrl = await sails.helpers.url.hacortador.with({ url, customSlug });
      }

      // 2) Obtener estilos y logos desde el helper
      const { estilos, logo } = await sails.helpers.estilos();

      // Validar que estilos y logo sean objetos con los datos requeridos
      if (!estilos || !logo) {
        throw new Error("No se encontraron los estilos o los logos en el helper.");
      }

      if (!estilos[style]) {
        throw new Error("Estilo seleccionado no válido.");
      }

      if (!logo[type]) {
        throw new Error("Tipo de imagen no válido. Usa 'png' o 'svg'.");
      }

      // 3) Configurar opciones del QR
      const opcionesQR = {
        ...estilos[style], // Estilos del QR
        data: finalUrl,     // URL para generar el código QR
        width: size,        // Ancho del QR
        height: size,       // Alto del QR
        image: logo[type]   // Logo o imagen a incluir en el QR
      };

      // 4) Crear QR con la librería
      const qrCode = new QRCodeStyling({
        nodeCanvas,
        jsdom: JSDOM,
        ...opcionesQR
      });

      const buffer = await qrCode.getRawData(type); // Obtener el QR en formato raw (png o svg)

      // 5) Retornar el QR generado
      return exits.success({
        qrImage: `data:image/${type};base64,${buffer.toString("base64")}`,
        shortUrl: finalUrl,
        message: 'QR generado exitosamente'
      });

    } catch (err) {
      sails.log.error('❌ Error en generarqrh:', err);
      return exits.error({ error: err.message });
    }
  }
};
