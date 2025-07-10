
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

        shortUrl: {
            type: 'string',
            required: true,
            description: 'La URL que se codificará en el QR.'
        },
        format: {
            type: 'string',
            required: false,
            defaultsTo: 'svg',
            description: 'Formato de salida: svg o png.'
        },
        size: {
            type: 'number',
            required: false,
            defaultsTo: 1200,
            description: 'se puede usar solo con parametro url'
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
            const options = {
                "width": inputs.size,
                "height": inputs.size,
                "data": "inputs.shortUrl",
                "margin": 0,
                "qrOptions": {
                    "typeNumber": "0",
                    "mode": "Byte",
                    "errorCorrectionLevel": "H"
                },
                "imageOptions": {
                    "hideBackgroundDots": true,
                    "imageSize": 0.32,
                    "margin": 2
                },
                "dotsOptions": {
                    "type": "dots",
                    "color": "#000000",
                    "gradient": null
                },
                "backgroundOptions": {
                    "color": "rgba(255, 255, 255, 0)"
                },

                image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTI4IDEyOCI+PHJlY3Qgd2lkdGg9IjEyOCIgaGVpZ2h0PSIxMjgiIHJ4PSIyMCIgcnk9IjIwIiBmaWxsPSIjZjQ2ZjEwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiIGR5PSIuM2VtIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPlFSPC90ZXh0Pjwvc3ZnPg==",
                "dotsOptionsHelper": {
                    "colorType": {
                        "single": true,
                        "gradient": false
                    },
                    "gradient": {
                        "linear": true,
                        "radial": false,
                        "color1": "#6a1a4c",
                        "color2": "#6a1a4c",
                        "rotation": "0"
                    }
                },
                "cornersSquareOptions": {
                    "type": "extra-rounded",
                    "color": "#f46f10",
                    "gradient": null
                },
                "cornersSquareOptionsHelper": {
                    "colorType": {
                        "single": true,
                        "gradient": false
                    },
                    "gradient": {
                        "linear": true,
                        "radial": false,
                        "color1": "#000000",
                        "color2": "#000000",
                        "rotation": "0"
                    }
                },
                "cornersDotOptions": {
                    "type": "dot",
                    "color": "#f46f10",
                    "gradient": null
                },
                "cornersDotOptionsHelper": {
                    "colorType": {
                        "single": true,
                        "gradient": false
                    },
                    "gradient": {
                        "linear": true,
                        "radial": false,
                        "color1": "#000000",
                        "color2": "#000000",
                        "rotation": "0"
                    }
                },
                "backgroundOptionsHelper": {
                    "colorType": {
                        "single": true,
                        "gradient": false
                    },
                    "gradient": {
                        "linear": true,
                        "radial": false,
                        "color1": "#ffffff",
                        "color2": "#ffffff",
                        "rotation": "0"
                    }
                }
            }

            const fileExtension = inputs.format.toLowerCase();
            if (!['svg', 'png'].includes(fileExtension)) {
                throw new Error(`Formato inválido: "${fileExtension}". Solo se permiten 'svg' o 'png'.`);
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
                shortUrl: inputs.shortUrl,
                message: 'QR generado exitosamente'
            });

        } catch (err) {
            sails.log.error('❌ Error generando QR en helper sergeneratorstandar:', err);
            return exits.error(err);
        }
    }
}