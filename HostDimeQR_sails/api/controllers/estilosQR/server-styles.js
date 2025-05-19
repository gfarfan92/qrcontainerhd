//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\estilosqr\server-styles.js




module.exports = {
  friendlyName: 'Obtener estilos',

  description: 'Devuelve un listado de estilos (con preview, logo, options, etc.)',

  inputs: {},

  exits: {
    success: {
      description: 'Estilos cargados exitosamente',
    },
    error: {
      description: 'Ocurrió un error al cargar los estilos'
    }
  },

  fn: async function (inputs, exits) {
    try {
      
      const data = await sails.helpers.loadstyles();
      
      return exits.success(data);
    } catch (error) {
      sails.log.error('Error al cargar estilos en server-styles.js:', error);
      return exits.error({ error: 'No se pudieron cargar los estilos' });
    }
  }
};
