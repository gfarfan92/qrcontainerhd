const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");

module.exports = {

  friendlyName: 'Generar QR Base64',

  description: 'Genera un QR personalizado y lo devuelve como string base64.',

  inputs: {
    url: {
      type: 'string',
      required: true
    }
  },

  exits: {},

  fn: async function (inputs) {

    const qrCode = new QRCodeStyling({
      nodeCanvas,
      jsdom: JSDOM,
      width: 300,
      height: 300,
      data: inputs.url,
      image: null,
      dotsOptions: {
        color: '#000',
        type: 'square'
      },
      backgroundOptions: {
        color: '#fff'
      }
    });

    const buffer = await qrCode.getRawData('png');
    const base64 = buffer.toString('base64');

    return base64;
  }
};
