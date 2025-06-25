//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\hoy\qr-hostdime\HostDimeQR_sails\api\helpers\style\loadstyles.js

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
    //const RUTA_LOGO_PNG = path.join(sails.config.appPath, 'assets', 'images', 'hostdime.svg');
// const RUTA_LOGO_SVG = path.join(sails.config.appPath, 'assets', 'images', 'hostdime.svg');
const RUTA_LOGO = path.join(sails.config.appPath, 'assets', 'images', 'logo.svg');
    const RUTA_ESTILOS = path.join(sails.config.appPath, 'files', 'getSettingsQR.json');


    let estilosQR = [];
    let Wtype = {};

      try {
        //console.log("🧭 Ruta al logo:", RUTA_LOGO_SVG);
        //console.log("🧭 Ruta al logo:", RUTA_LOGO_PNG);
        console.log("🧭 Ruta al logo:", RUTA_LOGO);
        const logoBase64PNG = await fs.promises.readFile(RUTA_LOGO, { encoding: 'base64' });
      //const logoBase64SVG = await fs.promises.readFile(RUTA_LOGO_SVG, { encoding: 'base64' });
      const logoBase64SVG = await fs.promises.readFile(RUTA_LOGO, { encoding: 'base64' });
        Wtype = {
          png: `data:image/png;base64,${logoBase64PNG}`,
         //png: `data:image/svg+xml;base64,${logoBase64SVG}`,
          svg: `data:image/svg+xml;base64,${logoBase64SVG}`
        };
      } catch (error) {
        sails.log.debug('Error al cargar logo', error);
        Wtype = { png: null, svg: null };
      }
    

   
      try {
        console.log("🧭 Ruta a estilos:", RUTA_ESTILOS);
        const data = fs.readFileSync(RUTA_ESTILOS, "utf8");
        const estilos = JSON.parse(data);
        estilosQR = estilos.map(estilo => ({
          ...estilo,
          image: Wtype.svg 
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
