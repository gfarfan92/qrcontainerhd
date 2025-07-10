//C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\HostDimeQr\QR PRUEBAS LOCAL\api\helpers\url\acortador.js

module.exports = {
  friendlyName: 'acortar Url',
  description: 'Acorta Url usando Api.',

  inputs: {
    url: { type: 'string', required: true },
    customSlug: { type: 'string', required: false }
  },

  exits: {
    success: {
      description: 'URL acortada correctamente.',
      outputType: 'string'
    },
    slugEnUso: {
      description: 'El slug personalizado ya está en uso.',
      outputType: {
        errcustom: 'string'
      }
    },
    error: {
      description: 'Error general al acortar URL.'
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
        return exits.slugEnUso({ errcustom: 'slugEnUso' });

      }

      const data = await response.json();
      return exits.success(data.shortUrl);
    } catch (error) {
      sails.log.error('❌ Error en fetch Shlink:', error.message);
      return exits.error({
        errcustom: 'falloApi'
      });
    }
  }
};
