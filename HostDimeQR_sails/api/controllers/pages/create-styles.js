// api/controllers/pages/create-styles.js
module.exports = {
  friendlyName: 'Vista crear estilos',

  description: 'Muestra la vista para crear estilos QR.',

  exits: {
    success: {
      viewTemplatePath: 'pages/create-styles'
    }
  },

  fn: async function () {
    return {};
  }
};
