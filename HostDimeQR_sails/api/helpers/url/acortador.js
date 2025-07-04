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

      if (!response.ok) {
        const errorData = await response.json();
        sails.log.error('❌ Error de Shlink:', errorData);
        return exits.error({
          message: 'Alias personalizado ya existe',
          errcustom: 'slugEnUso'
        });
      }

      const data = await response.json();
      return exits.success(data.shortUrl);
    } catch (error) {
      sails.log.error('❌ Error en fetch Shlink:', error.message);
      return exits.error({
        message: 'No se pudo conectar al acortador',
        errcustom: 'falloApi'
      });
    }
  }
};
