//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\qr\generateqr.js

const handleSimpleQR = require('./generarqrparts/handleSimpleQR');
const handleDetailedQR = require('./generarqrparts/handleDetailedQR');

module.exports = async function generateQR(payload) {
  try {
    if (payload.url && !payload.options) {
      return await handleSimpleQR(payload);
    }

    if (!payload.options || !payload.options.data) {
      throw new Error('Payload inválido. Debe incluir al menos "options.data".');
    }

    return await handleDetailedQR(payload);

  } catch (err) {
    sails.log.error('❌ Error en QRURLService.generateQR:', err);
    return {
      success: false,
      error: 'Error generando QR',
      details: err.message
    };
  }
};
