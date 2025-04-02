const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require('path');

const{estilosQR,Wtype} = require("../config/qrConfig");

let logoBase64;
 try {
    const logoPath = path.resolve(__dirname, "..", "public", "img", "hostdimelogo.png");

     logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
 } catch (error) {
     console.error("Error: No se pudo leer el archivo del logo.", error);
 }
 

 async function generarQR (req, res) {
    const { url, style, size, type, personalUrl } = req.body;

    // Validación básica de los parámetros
    if (!url || !style || !estilosQR[style] || !Wtype[type]) {
        return res.status(400).json({ error: "Parámetros inválidos." });
    }

    try {
        // Validación del alias personalizado
        let customSlug;//se debe utilizar customSlug para que funcione personalizar url en shlink
        if (personalUrl && personalUrl.trim() !== "") { //es para validar el campo en caso de ser llenado
            const slugRegex = /^[a-z0-9-_]+$/; // Solo minúsculas, números, guiones y guiones bajos
            customSlug = personalUrl.trim().toLowerCase();// me aseguro ya que es norma de shlink sacar url personalizada en minuscula para evitar conficto
        
            if (!slugRegex.test(customSlug)) {
                return res.status(400).json({
                    error: "Alias personalizado no válido. Usa solo letras minúsculas, números, '-' o '_'."
                });
            }
        }
        
        // Construir el cuerpo de la petición
        const bodyData = { longUrl: url };
        if (customSlug) {
            bodyData.customSlug = customSlug;
        }

        console.log("🔹 Cuerpo enviado a la API:", JSON.stringify(bodyData));

        // Hacer la petición a la API
        const shortenResponse = await fetch("https://qrlink.hostdi.me/rest/v3/short-urls", {
            method: "POST",
            headers: {
                "X-Api-Key": "7c24e07c7d1a-49a9-6465-937e-05e1f965",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        });

        const shortenData = await shortenResponse.json();
        console.log("🔹 Respuesta completa de la API:", shortenData);

        if (!shortenResponse.ok) {
            throw new Error(shortenData.detail || "Error desconocido al acortar la URL");
        }

        const shortUrl = shortenData.shortUrl;

        // Aqui tomo todos los datos del script y los llamo de los estilos predeterminados
        const opcionesQR = {
            ...estilosQR[style],
            data: shortUrl,
            width: parseInt(size),
            height: parseInt(size),
            image: Wtype[type]
        };

        // Generar el código QR
        const qrCode = new QRCodeStyling({ nodeCanvas, jsdom: JSDOM, ...opcionesQR });
        const buffer = await qrCode.getRawData(type);

        // Respuesta final
        res.json({
            shortUrl,
            qrImage: `data:image/${type};base64,${buffer.toString("base64")}`
        });

    } catch (error) {
        console.error("⚠️ Error al procesar la solicitud:", error.message);
        res.status(500).json({ error: error.message || "Error al generar el código QR." });
    }
};

module.exports = { generarQR };
