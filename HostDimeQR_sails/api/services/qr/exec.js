//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\qr\exec.js

const shortURL = require('./shorturl');
const generateQR = require('./generateqr');

module.exports = async function exec(item) {
  const { cmd, payload } = item;

  if (!payload || !payload.url) {
    return { success: false, error: 'Payload inválido. Se requiere al menos .url' };
  }

  switch (cmd) {
    case 'shortURL':
      return await shortURL(payload);
    case 'generarQR':
      return await generateQR(payload);
    default:
      return { success: false, error: `Comando desconocido: ${cmd}` };
  }
};

