//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\url\acortador.js

module.exports = {

  friendlyName: 'acortar Url',

  description: 'Acorta Url usando Api.',

  inputs: {
    url: { type: 'string', required: true },
    customSlug: { type: 'string', required: false }
  },

  exits: {
    success: {
      description: 'Estilos cargados exitosamente.'
    },
    error: {
      description: 'Ocurrió un error al cargar los estilos.'
    }
  },

  fn: async function (inputs, exits) {
    const { url, customSlug } = inputs;

    const bodyData = { longUrl: url };
    if (customSlug) {
      bodyData.customSlug = customSlug;
    }

    try {
         const response = await fetch("https://qrlink.hostdi.me/rest/v3/short-urls", {
      method: "POST",
      headers: {
        "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });

      console.log('Respuesta de la API:', response);

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`Error al acortar la URL: ${responseText}`);
      }

      const data = await response.json();
      return exits.success(data.shortUrl);
    } catch (error) {
      // Lanzar un error verdadero en lugar de solo un string
      console.error('Error de la API:', error);
      return exits.error(new Error(error.message || "Error desconocido al acortar la URL"));
    }
  }

};
