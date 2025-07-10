//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\helpers\qr\servgeneratorcustomer.js


const { QRCodeStyling } = require('@ckho/qr-code-styling/lib/qr-code-styling.common');
const sharp = require('sharp');
const { loadImage, nodeCanvas } = require("canvas");
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

      const fileExtension = format.toLowerCase();


      if (!['svg', 'png'].includes(fileExtension)) {
        throw new Error(`Formato inválido: "${fileExtension}". Solo se permiten 'svg' o 'png'.`);
      }



      if (options.image && typeof options.image === 'string') {
        try {
          if (options.image.startsWith('data:image/svg+xml;base64,')) {
            const svgBuffer = Buffer.from(options.image.split(',')[1], 'base64');
            const pngBuffer = await sharp(svgBuffer).png().toBuffer();

            const img = new nodeCanvas.Image();
            img.src = pngBuffer;
            options.image = img;
          } else {
            options.image = await loadImage(options.image); // Si ya es PNG o URL
          }
        } catch (imgErr) {
          sails.log.error('❌ Error procesando el logo base64:', imgErr);
          options.image = null;
        }
      }



      let qrInstance;
      let buffer;

      if (fileExtension === 'png') {
        qrInstance = new QRCodeStyling({
          nodeCanvas,

          ...options
        });
        buffer = await qrInstance.getRawData("png");
      } else {
        qrInstance = new QRCodeStyling({
          jsdom: JSDOM,
          type: "svg",
          ...options
        });
        buffer = await qrInstance.getRawData("svg");
      }

      const base64 = buffer.toString('base64');
      const fileName = `qr_${Date.now()}.${fileExtension}`;
      const tempFilePath = path.join(os.tmpdir(), fileName);
      await fs.writeFile(tempFilePath, buffer);

      sails.log.info(`✅ QR temporal (${fileExtension}) guardado en: ${tempFilePath}`);

      return exits.success({
        qrImage: `data:image/${fileExtension};base64,${base64}`,
        tempFilePath,
        shortUrl,
        message: 'QR generado exitosamente'
      });

    } catch (err) {
      sails.log.error('❌ Error generando QR en helper sergeneratorstandar:', err);
      return exits.error(err);
    }
  }
}