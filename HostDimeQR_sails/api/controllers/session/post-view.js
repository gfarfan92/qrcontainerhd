//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\session\post-view.js

module.exports = {

  friendlyName: 'Post view',

  description: 'Envio de formulario lleno',

  exits: {
    success: {
      viewTemplatePath: 'pages/token-input'
    }
  },

  fn: async function (inputs, exits) {
   
    const email = this.req.session.pendingEmail;

    return exits.success({
      titulo: "Ingresa tu token",
      email 
    });
  }
};
