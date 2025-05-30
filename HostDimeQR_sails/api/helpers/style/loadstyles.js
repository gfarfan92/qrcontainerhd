//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\style\loadstyles.js
const path = require('path');
const fs = require('fs');

module.exports = {

  friendlyName: 'Cargar estilos QR',

  description: 'Carga el logo y los estilos QR desde archivos del sistema.',

  inputs: {},

  exits: {
    success: { description: 'Estilos cargados exitosamente.' },
    error: { description: 'Ocurrió un error al cargar los estilos.' }
  },

  fn: async function (inputs, exits) {
    const RUTA_LOGO_PNG = path.join(sails.config.appPath, 'assets', 'images', 'hostdimelogo.png');
    const RUTA_LOGO_SVG = path.join(sails.config.appPath, 'assets', 'images', 'hostdimelogo.svg');
    const RUTA_ESTILOS = path.join(sails.config.appPath, 'files', 'getsettingsqr.json');

    let estilosQR = [];
    let Wtype = {};

    try {
      const logoBase64PNG = await fs.promises.readFile(RUTA_LOGO_PNG, { encoding: 'base64' });
      const logoBase64SVG = await fs.promises.readFile(RUTA_LOGO_SVG, { encoding: 'base64' });
      const logoRawSVG = await fs.promises.readFile(RUTA_LOGO_SVG, { encoding: 'utf-8' }); // SVG en crudo

    const RUTA_LOGO_SVG = path.join(sails.config.appPath, 'assets', 'images', 'hostdimelogo.svg');

Wtype = {
  png: `data:image/png;base64,${logoBase64PNG}`,
  svg: `data:image/svg+xml;base64,${logoBase64SVG}`,
  svgRaw: logoRawSVG,
  svgPath: `file://${RUTA_LOGO_SVG}` // ← clave para inline SVG
};

    } catch (error) {
      sails.log.debug('Error al cargar logo', error);
      Wtype = { png: null, svg: null, svgRaw: null };
    }

    try {
      const data = fs.readFileSync(RUTA_ESTILOS, "utf8");
      const estilos = JSON.parse(data);
      estilosQR = estilos.map(estilo => ({
        ...estilo,
        image: Wtype.png  // default PNG para vista previa o fallback
      }));
      sails.log.debug('✅ Estilos cargados exitosamente');
    } catch (error) {
      sails.log.debug("Error al cargar estilos", error);
      estilosQR = [];
    }

    return exits.success({
      estilos: estilosQR,
      logo: Wtype
    });
  }
};
