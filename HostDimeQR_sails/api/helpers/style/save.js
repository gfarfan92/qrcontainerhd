//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\style\save.js
// api/helpers/styles/save.js

const fs = require('fs');
const path = require('path');

module.exports = {

  friendlyName: 'Guardar nuevo estilo',

  description: 'Agrega un nuevo estilo al archivo getSettingsQR.json',

  inputs: {
    styleName: { type: 'string', required: true },
    dotsOptions: { type: 'json', required: true },
    cornersSquareOptions: { type: 'json', required: true },
    cornersDotOptions: { type: 'json', required: true },
    backgroundOptions: { type: 'json', required: true },
  },

  exits: {
    success: {
      description: 'Estilo guardado correctamente en el archivo.'
    },
    error: {
      description: 'Error al guardar el estilo.'
    }
  },

  fn: async function (inputs, exits) {

   //const filePath = path.resolve(__dirname, '../../../files/getSettingsQR.json');
   const RUTA_ESTILOS = path.join(sails.config.appPath, 'files', 'getsettingsqr.json');


    try {
      // Leer el archivo existente
      let estilos = [];
      if (fs.existsSync(RUTA_ESTILOS)) {
        const contenido = fs.readFileSync(RUTA_ESTILOS, 'utf8');
        estilos = contenido ? JSON.parse(contenido) : [];
      }

      // Crear nuevo objeto de estilo
      const nuevoEstilo = {
        styleName: inputs.styleName,
        dotsOptions: inputs.dotsOptions,
        cornersSquareOptions: inputs.cornersSquareOptions,
        cornersDotOptions: inputs.cornersDotOptions,
        backgroundOptions: inputs.backgroundOptions
      };

      // Agregarlo al arreglo y guardar
      estilos.push(nuevoEstilo);
      fs.writeFileSync(RUTA_ESTILOS, JSON.stringify(estilos, null, 2), 'utf8');

      sails.log.info('✅ Nuevo estilo guardado en JSON');
      return exits.success(nuevoEstilo);

    } catch (err) {
      sails.log.error('❌ Error al guardar estilo:', err);
      return exits.error(err);
    }

  }

};
