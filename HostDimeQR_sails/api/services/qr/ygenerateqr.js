// api/services/qr/generateqr.js
const fs = require('fs').promises;
const os = require('os');
const path = require('path');

module.exports = async function generateQR(payload) {
    let tempFilePath;


    try {

        let shortUrl = payload.url;

        if (payload.url && !payload.options) {
            const type = payload.format || 'svg';
            const size = payload.size || 1200;
            const style = 1;

           
            if (payload.short === true || payload.short === 'on' || payload.short === 'true') {
                try {
                    shortUrl = await sails.helpers.url.acortador.with({
                        url: payload.url,
                        customSlug: payload.customSlug
                    });
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
            }

            // Generar QR
            const qrResult = await sails.helpers.qr.generadorqr.with({
                shortUrl,
                type,
                size,
                style
            });

            tempFilePath = qrResult.tempFilePath;

            if (!tempFilePath || typeof tempFilePath !== 'string') {
                throw new Error('El helper generadorqr no devolvió una ruta de archivo temporal válida.');
            }

            const uniqueFileName = path.basename(tempFilePath);
            const objectName = `qrs/${uniqueFileName}`;

            const qrImageLink = await sails.helpers.url.uploadtominio.with({
                localFilePath: tempFilePath,
                objectName: objectName
            });

            return {
                success: true,
                response: {
                    qrLink: shortUrl,
                    qrImageLink,
                    qrImage: qrResult.qrImage
                }
            };
        }

        // === Caso DETALLADO: viene options
        if (!payload.options || !payload.options.data) {
            throw new Error('Payload inválido. Debe incluir al menos "options.data".');
        }

        const result = await sails.helpers.qr.servicegenerador.with({
            options: payload.options,
            format: payload.format || 'svg'
        });

        let qrImageLinkFromMinio = '';
        let tempFilePathDetailed;

        try {
            if (result.base64 && result.mime) {
                const fileExtension = result.mime.split('/')[1] || 'png';
                const uniqueFileName = `qr_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExtension}`;
                tempFilePathDetailed = path.join(os.tmpdir(), uniqueFileName);

                await fs.writeFile(tempFilePathDetailed, Buffer.from(result.base64, 'base64'));

                const objectNameDetailed = `qrs/${uniqueFileName}`;
                qrImageLinkFromMinio = await sails.helpers.url.uploadToMinio.with({
                    localFilePath: tempFilePathDetailed,
                    objectName: objectNameDetailed
                });
            }
        } catch (uploadErr) {
            sails.log.error('❌ Error subiendo QR detallado a MinIO:', uploadErr);
        } finally {
            if (tempFilePathDetailed) {
                try {
                    await fs.unlink(tempFilePathDetailed);
                } catch (unlinkErr) {
                    sails.log.warn('No se pudo eliminar archivo temporal detallado:', unlinkErr);
                }
            }
        }

        return {
            success: true,
            response: {
                qrImageLink: qrImageLinkFromMinio,
                qrImage: `data:${result.mime};base64,${result.base64}`
            }
        };
    } catch (err) {
        sails.log.error('❌ Error en QRURLService.generateQR:', err);
        return {
            success: false,
            error: 'Error generando QR',
            details: err.message
        };
    } finally {
        if (tempFilePath) {
            try {
                await fs.unlink(tempFilePath);
            } catch (unlinkErr) {
                sails.log.warn('No se pudo eliminar archivo temporal:', unlinkErr);
            }
        }
    }
};
