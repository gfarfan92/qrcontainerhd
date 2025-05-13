const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");

module.exports = {
  friendlyName: 'Crear qr',
  description: 'Genera un código QR con estilo personalizado.',

  inputs: {
    shortUrl: { type: 'string', required: true },
    style:    { type: 'number', required: true },
    size:     { type: 'number', required: true },
    type:     { type: 'string', required: true }, // png o svg
  },

  exits: {
    success: { description: 'QR exitoso.' },
    error:   { description: 'Ocurrió un error al crear QR.' }
  },

  fn: async function ({ shortUrl, style, size, type }, exits) {
    try {
      // 1) Obtener estilos y logos desde el helper
      const { estilos, logo } = await sails.helpers.estilos();

      if (!estilos || !logo) {
        throw new Error("No se encontraron los estilos o los logos en el helper.");
      }

      if (!estilos[style]) {
        throw new Error("Estilo seleccionado no válido.");
      }

      if (!logo[type]) {
        throw new Error("Tipo de imagen no válido. Usa 'png' o 'svg'.");
      }

      // 2) Configurar opciones del QR
      const opcionesQR = {
        ...estilos[style],
        data: shortUrl,
        width: size,
        height: size,
        image: logo[type]
      };

      // 3) Crear el QR
      const qrCode = new QRCodeStyling({
        nodeCanvas,
        jsdom: JSDOM,
        ...opcionesQR
      });

      const buffer = await qrCode.getRawData(type);

      // 4) Retornar el QR generado
      return exits.success({
        qrImage: `data:image/${type};base64,${buffer.toString("base64")}`,
        shortUrl: shortUrl,
        message: 'QR generado exitosamente'
      });

    } catch (err) {
      sails.log.error('❌ Error en generarqrh:', err);
      return exits.error({ error: err.message });
    }
  }
};
