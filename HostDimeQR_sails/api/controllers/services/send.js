//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\controllers\services\send.js

const tokenSend = sails.config.custom.access_token;
const QRURLService = require('../../services/qr'); 

module.exports = {
  friendlyName: 'Send up to 10 QR codes via API',
  description: 'Endpoint para generar hasta 10 códigos QR simultáneos usando QRURLService para consumo externo.',

  inputs: {},

  exits: {
    badRequest: { description: 'Request mal formado.', responseType: 'badRequest' },
    invalidToken: { description: 'Token inválido.', responseType: 'forbidden' }
  },

  fn: async function () {
    // ✅ Validar método
    if (this.req.method !== 'POST') {
      return this.res.badRequest({ error: 'Sólo se acepta POST' });
    }

    // ✅ Validar token de cabecera
    const access_token = this.req.headers['access_token'] || this.req.headers['x-access-token'];
    if (access_token !== tokenSend) {
      return this.res.forbidden({ error: 'Token inválido (header)' });
    }

    // ✅ Obtener cuerpo como array directamente
    const items = this.req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return this.res.badRequest({ error: 'Se requiere un array con al menos 1 item.' });
    }

    // ✅ Validar cada item
    const batch = items.slice(0, 10);
    for (const [i, item] of batch.entries()) {
      const url = item?.payload?.url;
      if (!url || typeof url !== 'string') {
        return this.res.badRequest({ error: `Ítem #${i} no tiene URL válida en payload.` });
      }
      if (!/^https?:\/\/.+/.test(url)) {
        return this.res.badRequest({ error: `Ítem #${i} tiene una URL inválida.` });
      }
    }

    // ✅ Ejecutar en paralelo
    const resultados = await Promise.all(
      batch.map(({ cmd = 'shortURL', payload }) => {
        return QRURLService.exec({ cmd, model: 'qr', payload });
      })
    );

    return this.res.json({
      success: true,
      requested: items.length,
      processed: resultados.length,
      results: resultados
    });
  }
};
