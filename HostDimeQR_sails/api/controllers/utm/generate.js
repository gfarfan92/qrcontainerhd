// api/controllers/utm/generate.js

module.exports = {
  friendlyName: 'Generate UTM URL',
  description: 'Arma una URL con parámetros UTM opcionales o devuelve la misma si ya los trae.',

  inputs: {
    // URL base (puede incluir o no parámetros UTM ya)
    url: {
      type: 'string',
      required: true,
      description: 'La URL original (p. ej. https://midominio.com).'
    },

    // Parámetros UTM opcionales:
    utm_source: {
      type: 'string',
      required: false,
      description: 'Parámetro utm_source (p. ej. instagram, facebook, etc.)'
    },
    utm_medium: {
      type: 'string',
      required: false,
      description: 'Parámetro utm_medium (p. ej. post, story, email).'
    },
    utm_campaign: {
      type: 'string',
      required: false,
      description: 'Parámetro utm_campaign (p. ej. lanzamiento, promoMayo).'
    },
    utm_term: {
      type: 'string',
      required: false,
      description: 'Parámetro utm_term (opcional, p. ej. keyword de búsqueda).'
    },
    utm_content: {
      type: 'string',
      required: false,
      description: 'Parámetro utm_content (opcional, p. ej. banner1, botónA).'
    }
  },

  exits: {
    success: {
      description: 'Se devolvió la URL con los UTM añadidos (o la original si ya los traía).'
    },
    invalid: {
      responseType: 'badRequest',
      description: 'Se mandó una URL inválida o los parámetros son incorrectos.'
    }
  },

  fn: async function (inputs, exits) {
    try {
      // 1. Tomamos la URL de entrada (puede traer o no ?utm_source=... etc).
      const rawUrl = inputs.url;
      let parsed;

      // 2. Intentamos parsear con el constructor URL de Node
      try {
        parsed = new URL(rawUrl);
      } catch (errParse) {
        // Si no es una URL válida, devolvemos “badRequest”
        return exits.invalid({
          error: 'La URL proporcionada no es válida o está mal formateada.'
        });
      }

      // 3. Si el usuario envía explícitamente utm_source, utm_medium, utm_campaign, etc.,
      //    los seteamos (sobrescriben lo que ya hubiera).
      //    Si no se envía alguno, dejamos lo que venga (si es que ya había utm en la URL).
      if (inputs.utm_source) {
        parsed.searchParams.set('utm_source', inputs.utm_source);
      }
      if (inputs.utm_medium) {
        parsed.searchParams.set('utm_medium', inputs.utm_medium);
      }
      if (inputs.utm_campaign) {
        parsed.searchParams.set('utm_campaign', inputs.utm_campaign);
      }
      if (inputs.utm_term) {
        parsed.searchParams.set('utm_term', inputs.utm_term);
      }
      if (inputs.utm_content) {
        parsed.searchParams.set('utm_content', inputs.utm_content);
      }

      // 4. Si la URL de entrada ya traía parámetros UTM y el usuario NO envió
      //    nuevos valores para alguno de ellos, el searchParams ya los habrá mantenido.
      //    Así nunca duplicamos ni rompemos nada.

      const finalUtmUrl = parsed.toString();
      // 5. Devolvemos un JSON con la URL resultante:
      return exits.success({ utmUrl: finalUtmUrl });

    } catch (unexpectedErr) {
      // Cualquier error inesperado lo devolvemos como badRequest también:
      return exits.invalid({ error: 'Error interno al generar UTM.' });
    }
  }
};
