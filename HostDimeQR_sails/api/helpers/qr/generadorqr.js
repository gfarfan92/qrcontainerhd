//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\helpers\qr\generadorqr.js

const { QRCodeStyling } = require('@ckho/qr-code-styling/lib/qr-code-styling.common');
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const fs = require("fs").promises;

const path = require("path");
const os = require("os");

module.exports = {
  friendlyName: 'Crear qr',
  description: 'Genera un código QR con estilo personalizado.',

  inputs: {
    shortUrl: { type: 'string', required: true },
    style: { type: 'number', required: true },
    size: { type: 'number', required: true },
    type: { type: 'string', required: true }, // png o svg
  },

  exits: {
    success: {
      description: 'QR exitoso.',
      outputFriendlyName: 'Datos del QR generado',
      outputType: {
        qrImage: 'string', // La imagen en base64
        tempFilePath: 'string', // La ruta al archivo temporal guardado
        shortUrl: 'string',
        message: 'string'
      }
    },
    error: { description: 'Ocurrió un error al crear QR.' }
  },

  fn: async function ({ shortUrl, style, size, type }, exits) {
    try {
      // 1) Obtener estilos y logos desde el helper
      const { estilos, logo } = await sails.helpers.style.loadstyles();

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

      // Guardar como archivo temporal para guardar despeus en minio
      const fileName = `qr_${Date.now()}_${Math.random().toString(36).substring(7)}.${type}`;

const tempFilePath = path.join(os.tmpdir(), fileName);
await fs.writeFile(tempFilePath, buffer);


      sails.log.info(`✅ QR temporal guardado en: ${tempFilePath}`);

      //PARA BORRAR

      /*const filename = `qr_${Date.now()}.${type}`;
     const outputDir = __dirname; 
     const outputPath = path.join(outputDir, filename);
     fs.writeFileSync(outputPath, buffer);
     sails.log.debug(`✅ QR guardado en: ${outputPath}`);*/

      // 4) Retornar el QR generado
      return exits.success({
  qrImage: `data:image/${type};base64,${buffer.toString("base64")}`,
  tempFilePath: tempFilePath,
  shortUrl: shortUrl,
  message: 'QR generado exitosamente'
});

    } catch (err) {
      sails.log.error('❌ Error en generarqrh:', err);
      return exits.error({ error: err.message });
    }
  }
};
