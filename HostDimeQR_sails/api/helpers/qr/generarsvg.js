const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");

module.exports = {
  friendlyName: 'Crear QR SVG con logo desde URL y estilo desde loadstyles',
  description: 'Genera QR SVG con logo de URL y estilo cargado dinámicamente',

  inputs: {
    shortUrl: { type: 'string', required: true },
    style: { type: 'number', required: true },
    size: { type: 'number', required: true }
  },

  exits: {
    success: { description: 'QR SVG generado exitosamente.' },
    error: { description: 'Error al generar QR SVG.' }
  },

  fn: async function ({ shortUrl, style, size }, exits) {
    try {
      // Cargar solo los estilos desde el helper loadstyles (no el logo)
      const { estilos } = await sails.helpers.style.loadstyles();

      if (!estilos || !estilos[style]) {
        throw new Error("Estilo seleccionado no válido.");
      }

      // Logo SVG URL fijo (lo pones directamente aquí)
      const logoUrl = "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";

      // Crear instancia QR con configuración
      const qrCodeSvg = new QRCodeStyling({
        jsdom: JSDOM,
        nodeCanvas,
        type: "svg",
        data: shortUrl,
        width: size,
        height: size,
        image: logoUrl,          // Logo desde URL fija
        ...estilos[style],       // Estilo dinámico cargado
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5
        }
      });

      // Obtener buffer raw SVG
      const buffer = await qrCodeSvg.getRawData("svg");

      // Retornar QR en base64 para fácil uso en frontend o APIs
      return exits.success({
        qrImage: `data:image/svg+xml;base64,${buffer.toString("base64")}`,
        shortUrl,
        message: "QR SVG generado con logo URL y estilo cargado"
      });

    } catch (err) {
      sails.log.error("❌ Error en generarsvg con logo URL y estilo:", err);
      return exits.error({ error: err.message });
    }
  }
};
