// C:\Users\GICOGERMANF\Pictures\GERMAN\funcional\qrHst\HostDimeQR_sails\api\helpers\style\deletes.js

const fs = require('fs');
const path = require('path');

module.exports = {
  friendlyName: 'Deletes',

  description: 'Elimina una configuración de estilo (styleName) del archivo getSettingsQR.json',

  inputs: {
    styleName: {
      type: 'string',
      required: true,
      description: 'El identificador del estilo (propiedad styleName) a eliminar',
    },
  },

  exits: {
    success: {
      description: 'Configuración eliminada correctamente',
    },
    notFound: {
      description: 'No se encontró la configuración con ese styleName',
    },
    error: {
      description: 'Error al leer o escribir el archivo de configuración',
    },
  },

  fn: async function (inputs, exits) {
    const { styleName } = inputs;

    // Ruta absoluta al archivo JSON
    const filePath = path.resolve(
      'C:/Users/GICOGERMANF/Pictures/GERMAN/funcional/qrHst/HostDimeQR_sails/files/getSettingsQR.json'
    );

    try {
      // Verificar si el archivo existe
      if (!fs.existsSync(filePath)) {
        return exits.notFound({
          message: 'Archivo de configuración no encontrado.',
        });
      }

      // Leer el archivo y parsear
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      let configArray;
      try {
        configArray = JSON.parse(fileContent);
      } catch (parseErr) {
        return exits.error({
          message: 'El archivo JSON está corrupto o no es válido.',
          details: parseErr.message,
        });
      }

      // Filtrar el array para excluir SOLO el objeto cuyo styleName coincida
      const newArray = configArray.filter(cfg => {
        // Si cfg.styleName existe y es igual al que queremos eliminar → lo filtramos (no lo incluimos en newArray).
        // Si cfg.styleName es distinto o no existe (objetos con "name"), lo mantenemos.
        return cfg.styleName !== styleName;
      });

      // Verificar si se eliminó algo: la longitud baja indica que hubo al menos 1 eliminación
      if (newArray.length === configArray.length) {
        return exits.notFound({
          message: `No se encontró ninguna configuración con styleName="${styleName}".`,
        });
      }

      // Sobrescribir el archivo con el array filtrado (indentación de 2 espacios)
      fs.writeFileSync(filePath, JSON.stringify(newArray, null, 2), 'utf-8');

      return exits.success({
        message: `La configuración con styleName="${styleName}" se eliminó correctamente.`,
      });
    } catch (err) {
      sails.log.error('Error eliminando configuración de estilo:', err);
      return exits.error({
        message: 'Error interno al eliminar configuración.',
        details: err.message,
      });
    }
  },
};
