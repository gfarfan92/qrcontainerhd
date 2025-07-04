//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\qr\generarqrparts\slugHandler.js

module.exports = async function slugHandler(payload) {
  try {
    const result = await sails.helpers.url.acortador.with({
      url: payload.url,
      customSlug: payload.customSlug
    });

    return { result };
  } catch (error) {
    sails.log.warn('⚠️ Slug duplicado detectado:', error.message);

    if (error.message.includes('slug') && error.message.includes('existe')) {
      return {
        error: {
          success: false,
          errcustom: 'slugEnUso',
          error: 'El customSlug ya está en uso.'
        }
      };
    }

    return {
      error: {
        success: false,
        errcustom: 'falloApi',
        error: error.message || 'Error al generar la URL corta.'
      }
    };
  }
};
