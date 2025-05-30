//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\qr\generadorqr.js
// api/helpers/style/loadstyles.js
const path = require('path');
const fs = require('fs');

module.exports = {
  friendlyName: 'Cargar estilos QR',

  description: 'Carga el logo y los estilos QR desde archivos del sistema.',

  inputs: {},

  exits: {
    success: {
      description: 'Estilos cargados exitosamente.'
    },
    error: {
      description: 'Ocurrió un error al cargar los estilos.'
    }
  },

  fn: async function (inputs, exits) {
    const RUTA_LOGO_PNG = path.join(sails.config.appPath, 'assets', 'images', 'hostdimelogo.png');
    const RUTA_LOGO_SVG = path.join(sails.config.appPath, 'assets', 'images', 'hostdime.svg');
    const RUTA_ESTILOS = path.join(sails.config.appPath, 'files', 'getsettingsqr.json');

    let estilosQR = [];
    let logos = {
      png: null,
      svgRaw: null
    };

    try {
      // Leer PNG base64
      const logoBase64PNG = await fs.promises.readFile(RUTA_LOGO_PNG, { encoding: 'base64' });
      logos.png = `data:image/png;base64,${logoBase64PNG}`;
    } catch (err) {
      sails.log.warn('No se pudo cargar logo PNG:', err.message);
    }

    try {
      // Leer SVG como texto crudo (XML)
      const logoSVGRaw = await fs.promises.readFile(RUTA_LOGO_SVG, { encoding: 'utf8' });
      logos.svgRaw = logoSVGRaw;
    } catch (err) {
      sails.log.warn('No se pudo cargar logo SVG:', err.message);
    }

    try {
      const data = await fs.promises.readFile(RUTA_ESTILOS, "utf8");
      const estilos = JSON.parse(data);

      // Los estilos sólo guardamos sin la imagen aquí, la imagen la agregamos en cada helper
      estilosQR = estilos;

      sails.log.debug('✅ Estilos cargados exitosamente');
    } catch (err) {
      sails.log.error('Error al cargar estilos:', err);
      return exits.error(err);
    }

    return exits.success({
      estilos: estilosQR,
      logo: logos
    });
  }
};
