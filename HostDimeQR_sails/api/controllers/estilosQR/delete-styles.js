// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\controllers\estilosqr\delete-styles.js


module.exports = {
  friendlyName: 'Eliminar estilo',

  description: 'Elimina un estilo del JSON usando el helper style.deletes',

  inputs: {
    styleName: {
      type: 'string',
      required: true,
      description: 'Nombre del estilo (propiedad styleName) a eliminar',
    },
  },

  exits: {
    success: {
      description: 'Estilo eliminado correctamente',
    },
    notFound: {
      description: 'No se encontró el estilo que querías eliminar',
    },
    error: {
      description: 'Error al eliminar el estilo',
    },
  },

 fn: async function ({ styleName }, exits) {
  try {
    const cleanName = styleName.replace(/\.json$/, '');
    const resultado = await sails.helpers.style.deletes.with({ styleName });
    return exits.success({ message: 'Estilo eliminado', data: resultado });
  } catch (err) {
    if (err.code === 'notFound') {
      return exits.notFound({ message: 'Estilo no encontrado' }); 
    }
    return exits.error({ message: 'Error eliminando estilo', details: err.message });
  }
}
};
