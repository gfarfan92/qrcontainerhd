const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const { obtenerEstilosQR, Wtype } = require("../config/qrConfig");

async function generarQRCode(url, style, size, type, customSlug) {
  const estilosQR = obtenerEstilosQR();
  if (!url || style === null || style === undefined || estilosQR[style] === undefined || Wtype[type] === undefined) {
    throw new Error("Parámetros inválidos.");
  }

  let shortUrl = url;
  if (customSlug) {
    const slugRegex = /^[a-z0-9-_]+$/;
    if (!slugRegex.test(customSlug)) {
      throw new Error("Alias personalizado no válido. Usa solo letras minúsculas, números, '-' o '_'.");
    }
  }

  const opcionesQR = {
    ...estilosQR[style],
    data: shortUrl,
    width: parseInt(size),
    height: parseInt(size),
    image: Wtype[type]
  };

  const qrCode = new QRCodeStyling({ nodeCanvas, jsdom: JSDOM, ...opcionesQR });
  const buffer = await qrCode.getRawData(type);

  return {
    qrImage: `data:image/${type};base64,${buffer.toString("base64")}`
  };
}

module.exports = { generarQRCode };
