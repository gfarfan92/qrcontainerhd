//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\helpers\qr\sergeneratorstandar.js
const { QRCodeStyling } = require('@ckho/qr-code-styling/lib/qr-code-styling.common');
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

module.exports = {
  friendlyName: 'Generar QR Avanzado',
  description: 'Genera un código QR con configuración avanzada y lo devuelve como base64. se trabaja con estilo estandar',

  inputs: {
    options: {
      type: 'ref',
      required: false,
      description: 'Opciones completas para el generador QR.'
    },
    format: {
      type: 'string',
      required: false,
      defaultsTo: 'svg',
      description: 'Formato de salida: svg o png.'
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
      const format = inputs.format || 'svg';
      let options = inputs.options;

      // Si no vienen opciones, usar por defecto con estilos
      if (!options) {
        options = {
          width: 1200,
          height: 1200,
          data: "https://files.hostdime.com/",
          margin: 0,
          qrOptions: {
            typeNumber: "0",
            mode: "Byte",
            errorCorrectionLevel: "H"
          },
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.32,
            margin: 2
          },
          dotsOptions: {
            type: "dots",
            color: "#000000"
          },
          backgroundOptions: {
            color: "rgba(255, 255, 255, 0)"
          },
          image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHJ4PSIyMCIgcnk9IjIwIiBmaWxsPSIjZjQ2ZjEwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiIGR5PSIuM2VtIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPlFSPC90ZXh0Pjwvc3ZnPg==",
          dotsOptionsHelper: {
            colorType: {
              single: true,
              gradient: false
            },
            gradient: {
              linear: true,
              radial: false,
              color1: "#6a1a4c",
              color2: "#6a1a4c",
              rotation: "0"
            }
          },
          cornersSquareOptions: {
            type: "extra-rounded",
            color: "#f46f10",
            gradient: null
          },
          cornersSquareOptionsHelper: {
            colorType: {
              single: true,
              gradient: false
            },
            gradient: {
              linear: true,
              radial: false,
              color1: "#000000",
              color2: "#000000",
              rotation: "0"
            }
          },
          cornersDotOptions: {
            type: "dot",
            color: "#f46f10",
            gradient: null
          },
          cornersDotOptionsHelper: {
            colorType: {
              single: true,
              gradient: false
            },
            gradient: {
              linear: true,
              radial: false,
              color1: "#000000",
              color2: "#000000",
              rotation: "0"
            }
          },
          backgroundOptionsHelper: {
            colorType: {
              single: true,
              gradient: false
            },
            gradient: {
              linear: true,
              radial: false,
              color1: "#ffffff",
              color2: "#ffffff",
              rotation: "0"
            }
          }
        };
      }

      const shortUrl = options.data || "https://files.hostdime.com/";

      // Crear QR
      const qrCode = new QRCodeStyling({
        nodeCanvas,
        jsdom: JSDOM,
        format,
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
      sails.log.error('❌ Error generando QR:', err);
      return exits.error(err);
    }
  }
};
