//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\qr\utils\customslug.js

module.exports = async function _getProcessedCustomSlug(customSlug) {
  if (customSlug) {
    const processedSlug = await sails.helpers.url.modify.with({ customSlug });
    sails.log.info(`💡 Slug original: "${customSlug}", Slug final: "${processedSlug}"`);
    return processedSlug;
  } else {
    sails.log.info('🤔 No se proporcionó customSlug. Se usará uno automático.');
    return undefined;
  }
};
