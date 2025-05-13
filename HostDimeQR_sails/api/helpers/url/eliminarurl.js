// api/helpers/url/eliminarurl.js

module.exports = {

  friendlyName: 'Eliminar short URL',
  description: 'Elimina un alias corto en la API de Shlink.',

  inputs: {
    customSlug: {
      type: 'string',
      required: true
    }
  },

  exits: {
    success: { description: 'Alias eliminado correctamente o no existía.' },
    error:   { description: 'Error al eliminar el alias.' }
  },

  fn: async function (inputs, exits) {
    const { customSlug } = inputs;

    try {
      const deleteResponse = await fetch(`https://qrlink.hostdi.me/rest/v3/short-urls/${customSlug}`, {
        method: "DELETE",
        headers: {
          "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
        }
      });

      // Si no existe (404), lo consideramos éxito
      if (deleteResponse.status === 404) {
        sails.log.warn(`Slug "${customSlug}" no existía, nada que eliminar.`);
        return exits.success();
      }

      // Para cualquier otro status no OK, devolvemos error
      if (!deleteResponse.ok) {
        const responseText = await deleteResponse.text();
        throw new Error(`No se pudo eliminar el alias. Código: ${deleteResponse.status}, Respuesta: ${responseText}`);
      }

      return exits.success();

    } catch (error) {
      // Asegúrate de lanzar un Error real para que sails pueda manejarlo
      return exits.error(error);
    }
  }
};
