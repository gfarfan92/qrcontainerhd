// api/helpers/qr/generador-png.js
const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");

module.exports = {
  friendlyName: 'Crear QR PNG',
  description: 'Genera un código QR PNG con logo en PNG.',

  inputs: {
    shortUrl: { type: 'string', required: true },
    style: { type: 'number', required: true },
    size: { type: 'number', required: true }
  },

  exits: {
    success: { description: 'QR PNG generado exitosamente.' },
    error: { description: 'Error al generar QR PNG.' }
  },

  fn: async function ({ shortUrl, style, size }, exits) {
    try {
      const { estilos, logo } = await sails.helpers.style.loadstyles();

      if (!estilos || !logo.png) {
        throw new Error("No se encontraron los estilos o el logo PNG.");
      }

      if (!estilos[style]) {
        throw new Error("Estilo seleccionado no válido.");
      }

      const opcionesQR = {
        ...estilos[style],
        data: shortUrl,
        width: size,
        height: size,
        image: logo.png,
        type: 'png'
      };

      const qrCode = new QRCodeStyling({
        nodeCanvas,
        jsdom: JSDOM,
        ...opcionesQR
      });

      const buffer = await qrCode.getRawData('png');

      return exits.success({
        qrImage: `data:image/png;base64,${buffer.toString("base64")}`,
        shortUrl,
        message: 'QR PNG generado exitosamente'
      });

    } catch (err) {
      sails.log.error('❌ Error en generador-png:', err);
      return exits.error({ error: err.message });
    }
  }
};
