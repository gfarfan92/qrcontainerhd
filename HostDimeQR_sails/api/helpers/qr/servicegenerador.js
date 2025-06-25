// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\helpers\qr\servicegenerador.js
const { QRCodeStyling } = require('@ckho/qr-code-styling/lib/qr-code-styling.common');
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");

module.exports = {

  friendlyName: 'Generar QR Avanzado',
  description: 'Genera un código QR con configuración avanzada y lo devuelve como base64.',

  inputs: {
    options: {
      type: 'ref',
      required: true,
      description: 'Configuración completa para el QR como el objeto pasado en el ejemplo.'
    },
    formato: {
      type: 'string',
      isIn: ['png', 'svg'],
      defaultsTo: 'png',
      description: 'Formato de salida del QR: "png" o "svg".'
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
      const { options, formato } = inputs;

      // Construcción del QR dependiendo del tipo
      const qrCode = new QRCodeStyling({
        nodeCanvas,
        jsdom: JSDOM,
        type: formato,
        ...options
      });

      const buffer = await qrCode.getRawData(formato);
      const base64 = buffer.toString('base64');

      return exits.success({
        mime: formato === 'svg' ? 'image/svg+xml' : 'image/png',
        base64: base64
      });

    } catch (err) {
      sails.log.error('Error generando QR:', err);
      return exits.error(err);
    }
  }
};
