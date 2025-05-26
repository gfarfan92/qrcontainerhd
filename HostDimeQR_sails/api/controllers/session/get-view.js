//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\session\get-view.js

module.exports = {


  friendlyName: 'Get view',


  description: 'Mostrar pagina pages/login',


  inputs: {

  },


  exits: {
success:{
  viewTemplatePath: 'pages/login'
}
  },


  fn: async function (inputs) {

  


    return{
      titulo:'Bienvenido a Qr HostDime login'
    };

  }


};
