//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\helpers\url\modify.js
module.exports = {

  friendlyName: 'Modificar short URL con número aleatorio',
  description: 'Agrega un número aleatorio de 2 cifras a un customSlug y devuelve el nuevo slug.',

  inputs: {
    customSlug: {
      type: 'string',
      required: true,
      description: 'El slug personalizado original al que se le agregará un número aleatorio.'
    }
  },

  exits: {
    success: {
      description: 'Slug modificado correctamente.',
      outputFriendlyName: 'Nuevo Custom Slug',
      outputExample: 'mi-slug-12' // Ejemplo de cómo se verá el output
    },
    error: {
      description: 'Error al generar el nuevo slug.',
      outputFriendlyName: 'Detalles del error'
    }
  },

  fn: async function (inputs, exits) {
    const { customSlug } = inputs;

    try {
     
      const randomNumber = Math.floor(Math.random() * 90) + 10;

   
      const newCustomSlug = `${customSlug}-${randomNumber}`;

      sails.log.info(`Original slug: "${customSlug}", New generated slug: "${newCustomSlug}"`);

    
      return exits.success(newCustomSlug);

    } catch (error) {
     
      sails.log.error('Error in modify-slug-with-random helper:', error.message);
      return exits.error(error);
    }
  }
};