//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\estilosQR\cobtener-estilo.js
module.exports = {

  friendlyName: 'Obtener estilo',

  description: 'Devuelve un estrilo de settings.json',

  inputs: {},

  exits: {
    success: {
      description: 'Todo salió bien',
    },
    error : {
      descripcion:'Hubo un problema al cargar los estilos'
    }
  },

  fn: async function (inputs, exits) {
    

 try {

  const data= await sails.helpers.estilos();
  return exits.success(data);
}catch(error){
  sails.log.debug('error al cargar estilos en controlador',error);
  return exits.error({error:'no se pudieron cargar los estilos'});
  }
}
  



  

};
