//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\qr\generarqrparts\uploadToMinio.js

const path = require('path');

module.exports = async function uploadToMinio(localFilePath) {
  const objectName = `qrs/${path.basename(localFilePath)}`;
  return await sails.helpers.url.uploadtominio.with({
    localFilePath,
    objectName
  });
};
