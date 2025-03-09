const express = require("express");
const { QRCodeStyling } = require("@ckho/qr-code-styling/lib/qr-code-styling.common");
const nodeCanvas = require("canvas");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos (como index.html)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Endpoint para generar el código QR
app.post("/generar-qr", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "No se proporcionó una URL válida." });
    }

    // Leer el logo en Base64
    let logoBase64;
    try {
        logoBase64 = fs.readFileSync("hostdimelogo.png", { encoding: "base64" });
    } catch (error) {
        console.error("Error: No se pudo leer el archivo del logo.", error);
        return res.status(500).json({ error: "Error al cargar el logo." });
    }

    // Configuración del QR
    let options = {
        width: 1200,
        height: 1200,
        data: url, // Usar la URL del usuario
        margin: 0,
        qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 13 },
        dotsOptions: { type: "square", color: "#000000" },
        backgroundOptions: { color: "rgba(255, 255, 255, 0)" },
        image: `data:image/png;base64,${logoBase64}`, // Logo en base64
        cornersSquareOptions: { type: "square", color: "#c40d81" },
        cornersDotOptions: { type: "dot", color: "#c40d81" }
    };

    // Crear el QR
    const qrCode = new QRCodeStyling({ nodeCanvas, jsdom: JSDOM, ...options });

    try {
        const buffer = await qrCode.getRawData("png");
        res.setHeader("Content-Type", "image/png");
        res.send(buffer);
    } catch (error) {
        console.error("Error al generar el QR:", error);
        res.status(500).json({ error: "Error al generar el código QR." });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
