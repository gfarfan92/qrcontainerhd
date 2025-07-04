//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\services\qr\shorturl.js
const _getProcessedCustomSlug = require('./utils/customslug');
module.exports = async function shortURL(payload) {
    try {
        let { url, customSlug } = payload;
        customSlug = customSlug;
        //customSlug = await QRURLService._getProcessedCustomSlug(customSlug);
        //customSlug = await sails.helper.url.eliminar.with(customSlug);
        const shortUrl = await sails.helpers.url.acortador.with({
            url,
            customSlug
        });

        return {
            success: true,
            response: {
                shortUrl,
                customSlugUsed: customSlug
            }
        };
    } catch (error) {
                    sails.log.warn('⚠️ Slug duplicado detectado:', error.message);

                    if (error.message.includes('slug') && error.message.includes('existe')) {
                        return {
                            success: false,
                            errcustom: 'slugEnUso',
                            error: 'El customSlug ya está en uso.'
                        };
                    }

                    return {
                        success: false,
                        errcustom: 'falloApi',
                        error: error.message || 'Error al generar la URL corta.'
                    };
                }
};
