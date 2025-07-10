//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\qr\generarqrparts\handleDetailedQR.js

const fs = require('fs').promises;
const path = require('path');
const os = require('os');
const slugHandler = require('./slugHandler');
const uploadToMinio = require('./uploadToMinio');

module.exports = async function handleSimpleQR(payload) {


  let tempFilePath;
  let shortUrl = payload.url;

  try {
    if (payload.short !== false && payload.short !== 'false') {
      const { error, result } = await slugHandler(payload);
      if (error) return error;
      shortUrl = result;
    }

    const qrResult = await sails.helpers.qr.servgeneratorcustomer.with({
      options: payload.options,
      format: payload.format || 'svg',
      shortUrl,
       width: payload.size,
        height: payload.size,
    });

    tempFilePath = qrResult.tempFilePath;

    if (!tempFilePath || typeof tempFilePath !== 'string') {
      throw new Error('El helper generadorqr no devolvió una ruta de archivo temporal válida.');
    }

    const qrImageLink = await uploadToMinio(tempFilePath);

    return {
      success: true,
      response: {
        qrLink: shortUrl,
        qrImageLink,
        qrImage: qrResult.qrImage
      }
    };
  } finally {
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath);
      } catch (err) {
        sails.log.warn('No se pudo eliminar archivo temporal:', err);
      }
    }
  }
};

