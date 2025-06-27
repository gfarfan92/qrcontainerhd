// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\helpers\url\uploadToMinio.js

const Minio = require('minio');
const path = require('path');
const fileType = require('file-type'); // Asegúrate de tener 'file-type' instalado: npm install file-type

/**
 * Helper para subir archivos a MinIO
 *
 * Ejemplos de uso:
 *
 * // Caso 1: Pasar objectName explícito y bucket por defecto
 * await sails.helpers.url.uploadToMinio.with({ localFilePath: '/ruta/a/archivo.png', objectName: 'carpeta/archivoRemoto.png'});
 *
 * // Caso 2: No pasar objectName, usa el nombre del archivo local
 * await sails.helpers.url.uploadToMinio.with({ localFilePath: '/ruta/a/archivo.png' });
 *
 * // Caso 3: Sobreescribir bucket por defecto
 * await sails.helpers.url.uploadToMinio.with({ localFilePath: '/ruta/a/archivo.png', bucketName: 'otro-bucket' });
 */

module.exports = {

    friendlyName: 'Upload to MinIO',
    description: 'Sube un archivo local al bucket de MinIO y devuelve la URL pública.',
    inputs: {
        localFilePath: {
            type: 'string',
            required: true,
            description: 'Ruta completa del archivo local.'
        },
        objectName: {
            type: 'string',
            description: 'Nombre del archivo como se guardará en MinIO. Si no se pasa, usa el nombre del archivo local.',
            defaultsTo: '' // ¡CORRECCIÓN: Este defaultsTo es importante para el comportamiento deseado!
        },
        bucketName: {
            type: 'string',
            description: 'Nombre del bucket para sobreescribir el valor configurado (opcional).',
            defaultsTo: ''
        },
    },

    exits: {
        success: {
            description: 'Archivo subido exitosamente.',
            outputFriendlyName: 'URL Pública de MinIO', // Mejora de documentación
            outputType: 'string' // Mejora de documentación
        },
        error: {
            description: 'Hubo un problema al subir el archivo.',
            outputFriendlyName: 'Error de subida a MinIO',
            outputType: 'ref' // Puede ser un objeto de error
        }
    },

    fn: async function({ localFilePath, objectName, bucketName }) {
        // ¡CORRECCIÓN: Extrae useSSL del config!
        let { endPoint, port, accessKey, secretKey, bucket: defaultBucket, useSSL = true } = sails.config.custom.minio;

        const bucketToUse = bucketName && bucketName.trim() !== '' ? bucketName : defaultBucket;

        // Si objectName viene vacío o solo espacios, path.basename(localFilePath) se usará debido a defaultsTo: ''
        const objectKey = objectName || path.basename(localFilePath);

        const minioClient = new Minio.Client({
            endPoint,
            port,
            accessKey,
            secretKey,
            useSSL // ¡CORRECCIÓN: Usar el valor de useSSL del config!
        });

        // Intentar detectar el Content-Type; si falla, usar un default seguro
        let contentType = 'application/octet-stream';
        try {
            const fileTypeRes = await fileType.fileTypeFromFile(localFilePath);
            if (fileTypeRes) {
                contentType = fileTypeRes.mime;
            }
        } catch (err) {
            sails.log.warn(`No se pudo detectar el tipo de archivo para ${localFilePath}, usando default. Error: ${err.message}`);
        }

        try {
            await minioClient.fPutObject(bucketToUse, objectKey, localFilePath, { 'Content-Type': contentType });

            // Construir la URL pública de forma más robusta
            let publicUrl;
            if (useSSL) {
                publicUrl = `https://${endPoint}`;
                if (port !== 443) { // Solo añadir puerto si no es el estándar para HTTPS
                    publicUrl += `:${port}`;
                }
            } else {
                publicUrl = `http://${endPoint}`;
                if (port !== 80) { // Solo añadir puerto si no es el estándar para HTTP
                    publicUrl += `:${port}`;
                }
            }
            publicUrl += `/${bucketToUse}/${objectKey}`;


            sails.log.info(`Archivo subido a MinIO en bucket '${bucketToUse}': ${objectKey} con content-type: ${contentType}. URL: ${publicUrl}`);
            return publicUrl;

        } catch (err) {
            sails.log.error('Error subiendo el archivo a MinIO:', err);
            throw err; // Re-lanza el error para que sea capturado por el servicio
        }
    }
};