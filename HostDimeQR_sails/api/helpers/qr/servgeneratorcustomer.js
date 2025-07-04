//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\helpers\qr\servgeneratorcustomer.js


const { QRCodeStyling } = require('@ckho/qr-code-styling/lib/qr-code-styling.common');
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

module.exports = {

  friendlyName: 'Generar QR Avanzado',
  description: 'Genera un código QR con configuración avanzada y lo devuelve como base64.',

 inputs: {
  options: {
    type: 'ref',
    required: true,
    description: 'Configuración completa para el QR como el objeto pasado en el ejemplo.'
  },
  format: {
    type: 'string',
    isIn: ['png', 'svg'],
    defaultsTo: 'svg',
    description: 'Formato de salida del QR: "png" o "svg".'
  },
  shortUrl: {
    type: 'string',
    required: true,
    description: 'URL acortada que se devolverá como enlace del QR.'
  }
},

  exits: {
    success: {
      outputType: 'ref',
      description: 'Buffer del QR generado en base64'
    },
    error: {
      description: 'Ocurrió un error al generar el QR.'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const { options, format, shortUrl } = inputs;

      // Construcción del QR dependiendo del tipo
      const qrCode = new QRCodeStyling({
        nodeCanvas,
        jsdom: JSDOM,
        type: format,
        ...options
      });

      const buffer = await qrCode.getRawData(format);
      const base64 = buffer.toString('base64');

// esto es para guardar qr en temporal

      const fileName = `qr_${Date.now()}_${Math.random().toString(36).substring(7)}.${format}`;
      const tempFilePath = path.join(os.tmpdir(), fileName);

      await fs.writeFile(tempFilePath, buffer);

      sails.log.info(`✅ QR temporal guardado en: ${tempFilePath}`);

      return exits.success({
        qrImage: `data:image/${format};base64,${base64}`,
        tempFilePath,
        shortUrl,
        message: 'QR generado exitosamente'
      });

    } catch (err) {
      sails.log.error('Error generando QR:', err);
      return exits.error(err);
    }
  }
};
