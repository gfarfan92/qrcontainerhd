//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\estilosQR\save-style.js

module.exports = {


  friendlyName: 'Save style',


  description: 'Redirecciona a aformulario para estilos nuevos',


  inputs: {
    styleName: { type: 'string', required: true },
    dotsOptions: { type: 'json', required: true },
    cornersSquareOptions: { type: 'json', required: true },
    cornersDotOptions: { type: 'json', required: true },
    backgroundOptions: { type: 'json', required: true },
  },



  exits: {
    success: {
      description: 'Estilo guardado exitosamente y redireccionamiento gestionado por el frontend.'

    }
  },


  fn: async function (inputs, exits) {
    sails.log.info('📦 Inputs recibidos en save-styles:', inputs);
    const {
      styleName,
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      backgroundOptions,
    } = inputs;
    const data = await sails.helpers.style.save.with({
      styleName,
      dotsOptions,
      cornersSquareOptions,
      cornersDotOptions,
      backgroundOptions,
    });
    return this.res.json({ success: true, redirectTo: '/session/homepage' });






  }


};
