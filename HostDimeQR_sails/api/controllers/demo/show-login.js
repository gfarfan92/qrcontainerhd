//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\demo\show-login.js

module.exports = {


  friendlyName: 'Show login',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      viewTemplatePath: 'pages/show-login'
    }
  },

  fn: async function () {
    // Puedes pasar datos a la vista como propiedades de 'this'
    return {
      titulo: 'Bienvenido a QR HostDime login'
    };
  }


};
