//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\estilos.js

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
    const RUTA_LOGO = path.join(sails.config.appPath, 'assets', 'images', 'hostdimelogo.png');

    const RUTA_ESTILOS = path.join(sails.config.appPath, 'files', 'settingsQR.json');


    let estilosQR = [];
    let Wtype = {};

      try {
        console.log("🧭 Ruta al logo:", RUTA_LOGO);
        const logoBase64 = await fs.promises.readFile(RUTA_LOGO, { encoding: 'base64' });
        Wtype = {
          png: `data:image/png;base64,${logoBase64}`,
          svg: `data:image/svg+xml;base64,${logoBase64}`
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
          image: Wtype.png // Asegurarse de que se use el logo cargado
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
