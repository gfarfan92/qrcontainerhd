const { QRCodeStyling } = require("qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require('path');


const { estilosQR, Wtype } = require("../config/qrConfig");

let logoBase64;
try {
    const logoPath = path.resolve(__dirname, "..", "public", "img", "hostdimelogo.png");
    logoBase64 = fs.readFileSync(logoPath, { encoding: "base64" });
} catch (error) {
    console.error("Error: No se pudo leer el archivo del logo.", error);
}

// Función para eliminar un alias en Shlink
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

async function generarQR(req, res) {
    const { url, style, size, type, personalUrl } = req.body;

    if (!url || style === null || style === undefined || estilosQR[style] === undefined || Wtype[type] === undefined) {
        return res.status(400).json({ error: "Parámetros inválidos." });
    }

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

            // Intentar eliminar el alias antes de crearlo
            await eliminarSlug(customSlug);
        }

        const bodyData = { longUrl: url };
        if (customSlug) {
            bodyData.customSlug = customSlug;
        }

        console.log("🔹 Cuerpo enviado a la API:", JSON.stringify(bodyData));

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

        const opcionesQR = {
            ...estilosQR[style],
            data: shortUrl,
            width: parseInt(size),
            height: parseInt(size),
            image: Wtype[type]
        };

        const qrCode = new QRCodeStyling({ nodeCanvas, jsdom: JSDOM, ...opcionesQR });
        const buffer = await qrCode.getRawData(type);

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
