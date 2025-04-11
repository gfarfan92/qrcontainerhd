const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const { obtenerEstilosQR, Wtype } = require("../config/qrConfig");

async function eliminarSlug(customSlug) {
  try {
    const deleteResponse = await fetch(`https://qrlink.hostdi.me/rest/v3/short-urls/${customSlug}`, {
      method: "DELETE",
      headers: {
        "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
        "Content-Type": "application/json"
      }
    });
    if (!deleteResponse.ok) {
      throw new Error("No se pudo eliminar el alias existente");
    }
    console.log(`✅ Alias eliminado: ${customSlug}`);
  } catch (error) {
    console.error(`⚠️ Error al eliminar alias ${customSlug}:`, error.message);
  }
}



//tomo de qrRoutes que me envio por router.post y con los datos se genera el qr
async function generarQR(req, res) {
  //aqui extrae el paquete y tomo lo que pidio el usuario
  const { url, style, size, type, personalUrl } = req.body;
//segun lo pedido y por el indice del array traigo el estilo de qrConfig(despues del proceso de actuaqlizar y enviar en un array el estilo del .json)y tomo lo pedido 
  const estilosQR = obtenerEstilosQR();
  if (!url || style === null || style === undefined || estilosQR[style] === undefined || Wtype[type] === undefined) {
    return res.status(400).json({ error: "Parámetros inválidos." });
  }
//verificaciones que todo este bien y bajo parametros
  try {
    let customSlug;
    if (personalUrl && personalUrl.trim() !== "") {
      const slugRegex = /^[a-z0-9-_]+$/;
      customSlug = personalUrl.trim().toLowerCase();

      if (!slugRegex.test(customSlug)) {
        return res.status(400).json({
          error: "Alias personalizado no válido. Usa solo letras minúsculas, números, '-' o '_'."
        });
      }

      await eliminarSlug(customSlug);
    }
// aqui armamos el paquete pa la API de acortamiento el paquete sera bodyData
    const bodyData = { longUrl: url };
    if (customSlug) {
      bodyData.customSlug = customSlug;
    }

    console.log("🔹 Cuerpo enviado a la API:", JSON.stringify(bodyData));
//aqui enviamos nuestro bodyData a la API  y empaquetamos como shortenResponse 
    const shortenResponse = await fetch("https://qrlink.hostdi.me/rest/v3/short-urls", {
      method: "POST",
      headers: {
        "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });
//ahora recibimos la respuesta: shortenResponse  y empaquetamos en shortenData
    const shortenData = await shortenResponse.json();
    console.log("🔹 Respuesta completa de la API:", shortenData);

    if (!shortenResponse.ok) {
      throw new Error(shortenData.detail || "Error desconocido al acortar la URL");
    }
//esto sera la URL acortada y concatenamos nuestro pernonalUrl que puso el usuario en el vue
    const shortUrl = shortenData.shortUrl;
//POR FIN GENERAMOS QR CON ESTILO APLICADO
    const opcionesQR = {
      ...estilosQR[style],
      data: shortUrl,
      width: parseInt(size),
      height: parseInt(size),
      image: Wtype[type]
    };
//Aqui guadamos nuestro estilo en memoria
    const qrCode = new QRCodeStyling({ nodeCanvas, jsdom: JSDOM, ...opcionesQR });
    const buffer = await qrCode.getRawData(type);
//lo que reponderemos al frontend
    res.json({
      shortUrl,
      qrImage: `data:image/${type};base64,${buffer.toString("base64")}`
    });
  } catch (error) {
    console.error("⚠️ Error al procesar la solicitud:", error.message);
    res.status(500).json({ error: error.message || "Error al generar el código QR." });
  }
}

module.exports = { generarQR };
